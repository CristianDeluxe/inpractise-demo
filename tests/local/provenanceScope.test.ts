import { describe, expect, it } from 'vitest'
import { asPrincipal } from '../database/asPrincipal.ts'
import { seedTransactionPrincipal } from '../database/seedTransactionPrincipal.ts'
import { diagnosticsPayload } from './diagnosticsPayload.ts'
import { fixtureRevisionId } from './fixtureRevisionId.ts'
import { seedAuthorizationFixture } from './seedAuthorizationFixture.ts'
import { supersededRevisionId } from './supersededRevisionId.ts'
import { withLocalRollback } from './withLocalRollback.ts'

describe('provenance reopens one request under real row level security', () => {
  it('reads the caller own request, hides it from another organisation, and reports a superseded revision truthfully', async () => {
    await withLocalRollback(async (sql) => {
      await seedAuthorizationFixture(sql)
      const digest = 'b'.repeat(64)
      await sql`insert into public.document_revisions(org_id,document_id,revision_id,title,company,kind,origin,published_at,raw_sha256,normalized_sha256,passage_sha256,canonical_content,parser_version,chunker_version,embedding_model,index_mode,coverage,rights_basis,rights_status,published,is_current)
        values('org-a','basic-doc',${supersededRevisionId},'Earlier fixture interview','Fixture Company','synthetic_interview','synthetic','2026-08-01T00:00:00Z',${digest},${digest},${digest},'An earlier revision was superseded.','parser-v1','speaker-codepoint-v1','text-embedding-3-small','lexical_only','{}','Synthetic fixture','approved',true,false)`

      const owner = await seedTransactionPrincipal(sql, 'org-a')
      await asPrincipal(sql, owner)
      const [debited] = await sql`select public.debit_request() as request_id`
      const requestId = debited?.['request_id'] as string
      await sql`select public.record_request_diagnostics(${requestId},${sql.json(diagnosticsPayload())})`

      const [ownRow] =
        await sql`select request_id from public.request_usage where request_id=${requestId}`
      expect(ownRow?.['request_id']).toBe(requestId)

      const revisions = await sql`select document_id,revision_id,is_current
        from public.document_revisions
        where revision_id in (${fixtureRevisionId},${supersededRevisionId})`
      const currency = new Map(
        revisions.map((row) => [row['revision_id'], row['is_current']]),
      )
      expect(currency.get(fixtureRevisionId)).toBe(true)
      expect(currency.get(supersededRevisionId)).toBe(false)

      await sql`reset role`
      const stranger = await seedTransactionPrincipal(sql, 'org-b')
      await asPrincipal(sql, stranger)
      const hidden =
        await sql`select request_id from public.request_usage where request_id=${requestId}`
      expect(hidden).toEqual([])
    })
  })
})
