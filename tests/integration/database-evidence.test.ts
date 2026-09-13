import { describe, expect, it } from 'vitest'
import { loadCorpus } from '../../scripts/db/loadCorpus.ts'
import { readEmbedding } from '../../scripts/db/readEmbedding.ts'
import { fuseRanks } from '../../supabase/functions/_shared/search/fuseRanks.ts'
import { requireValue } from '../assertions/requireValue.ts'
import { asPrincipal } from '../database/asPrincipal.ts'
import { seedTransactionPrincipal } from '../database/seedTransactionPrincipal.ts'
import { withRollback } from '../database/withRollback.ts'

describe('remote transactional database assertions', () => {
  it(
    'retains published evidence against privileged update, insert and delete',
    async () =>
      withRollback(async (sql) => {
        const rows =
          await sql`select * from public.passages where org_id='org-a' and document_id='s1' limit 1`
        expect(rows).toHaveLength(1)
        const row = requireValue(rows[0])
        await expect(
          sql.savepoint(async (tx) => {
            await tx`update public.passages set text_content='tampered' where org_id='org-a' and document_id='s1' and passage_id=${String(row['passage_id'])}`
          }),
        ).rejects.toMatchObject({ message: 'Published passage is immutable' })
        await expect(
          sql.savepoint(async (tx) => {
            await tx`delete from public.passages where org_id='org-a' and document_id='s1'`
          }),
        ).rejects.toMatchObject({ message: 'Published passage is immutable' })
        await expect(
          sql.savepoint(async (tx) => {
            await tx`insert into public.passages(org_id,document_id,revision_id,passage_id,ordinal,section,text_content,token_count,embedding_model) values('org-a','s1',${String(row['revision_id'])},'injected',999,'Interview','injected',1,'text-embedding-3-small')`
          }),
        ).rejects.toMatchObject({ message: 'Published passage is immutable' })
      }),
    60000,
  )
  it(
    'runs exact vector candidates under RLS and preserves branch ranks for RRF',
    async () =>
      withRollback(async (sql) => {
        const document = requireValue(
          loadCorpus().find((d) => d.documentId === 's1'),
        )
        const passage = requireValue(
          document.passages.find((p) => p.passageId === 'P2'),
        )
        const embedding = requireValue(readEmbedding(passage.text))
        const user = await seedTransactionPrincipal(sql, 'org-a')
        await asPrincipal(sql, user)
        const rows =
          await sql`select * from public.search_candidates('rebuilding integrations retraining',${JSON.stringify(embedding.vector)}::extensions.vector,${document.companySlug},30)`
        expect(
          rows.filter((r) => r['branch'] === 'vector').length,
        ).toBeGreaterThan(0)
        expect(
          rows.every(
            (r) => r['org_id'] === 'org-a' && r['document_id'] !== 's6',
          ),
        ).toBe(true)
        const vectorGold = rows.find(
          (r) =>
            r['branch'] === 'vector' &&
            r['document_id'] === 's1' &&
            r['passage_id'] === 'P2',
        )
        expect(Number(vectorGold?.['rank'])).toBe(1)
        expect(Number(vectorGold?.['cosine_distance'])).toBeCloseTo(0, 5)
        const fused = fuseRanks(
          ['fts', 'vector'].map((branch) =>
            rows
              .filter((r) => r['branch'] === branch)
              .map((r) => ({
                key: `${String(r['document_id'])}:${String(r['revision_id'])}:${String(r['passage_id'])}`,
                rank: Number(r['rank']),
              })),
          ),
        )
        expect(requireValue(fused[0]).key).toBe(`s1:${document.revisionId}:P2`)
        expect(requireValue(fused[0]).fusionScore).toBeCloseTo(2 / 61)
      }),
    60000,
  )
  it(
    'loads a distinct foreign canary without making it readable across organisations',
    async () =>
      withRollback(async (sql) => {
        const foreignPremium = await seedTransactionPrincipal(
          sql,
          'org-b',
          true,
        )
        await asPrincipal(sql, foreignPremium)
        const rows =
          await sql`select p.text_content from public.passages p join public.document_revisions r using(org_id,document_id,revision_id) where r.is_current and p.document_id='s6'`
        expect(
          rows.some((row) => String(row['text_content']).includes('CEDAR-29')),
        ).toBe(true)
        expect(
          rows.some((row) => String(row['text_content']).includes('ORCHID-74')),
        ).toBe(false)
      }),
    60000,
  )
})
