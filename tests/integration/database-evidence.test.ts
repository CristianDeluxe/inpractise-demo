import { describe, expect, it } from 'vitest'
import { loadCorpus } from '../../scripts/db/loadCorpus.ts'
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
          await sql`select * from public.passages where org_id='org-a' and document_id='pod-roche-2024' limit 1`
        expect(rows).toHaveLength(1)
        const row = requireValue(rows[0])
        await expect(
          sql.savepoint(async (tx) => {
            await tx`update public.passages set text_content='tampered' where org_id='org-a' and document_id='pod-roche-2024' and passage_id=${String(row['passage_id'])}`
          }),
        ).rejects.toMatchObject({ message: 'Published passage is immutable' })
        await expect(
          sql.savepoint(async (tx) => {
            await tx`delete from public.passages where org_id='org-a' and document_id='pod-roche-2024'`
          }),
        ).rejects.toMatchObject({ message: 'Published passage is immutable' })
        await expect(
          sql.savepoint(async (tx) => {
            await tx`insert into public.passages(org_id,document_id,revision_id,passage_id,ordinal,section,text_content,token_count,embedding_model) values('org-a','pod-roche-2024',${String(row['revision_id'])},'injected',999,'Interview','injected',1,'text-embedding-3-small')`
          }),
        ).rejects.toMatchObject({ message: 'Published passage is immutable' })
      }),
    60000,
  )
  it(
    'runs lexical candidates under RLS over the podcasts and keeps branch ranks',
    async () =>
      withRollback(async (sql) => {
        const document = requireValue(
          loadCorpus().find((d) => d.documentId === 'pod-roche-2024'),
        )
        const user = await seedTransactionPrincipal(sql, 'org-a')
        await asPrincipal(sql, user)
        const rows =
          await sql`select * from public.search_candidates('billion Swiss francs research development',null,${document.companySlug},30)`
        expect(rows.length).toBeGreaterThan(0)
        expect(rows.every((r) => r['branch'] === 'fts')).toBe(true)
        expect(
          rows.every(
            (r) =>
              r['org_id'] === 'org-a' &&
              String(r['document_id']).startsWith('pod-'),
          ),
        ).toBe(true)
        const fused = fuseRanks([
          rows.map((r) => ({
            key: `${String(r['document_id'])}:${String(r['revision_id'])}:${String(r['passage_id'])}`,
            rank: Number(r['rank']),
          })),
        ])
        expect(fused.map((item) => item.key)).toContain(
          `pod-roche-2024:${document.revisionId}:T018.1`,
        )
      }),
    60000,
  )
  it(
    'keeps hidden kinds unreadable for a foreign premium member too',
    async () =>
      withRollback(async (sql) => {
        const foreignPremium = await seedTransactionPrincipal(
          sql,
          'org-b',
          true,
        )
        await asPrincipal(sql, foreignPremium)
        expect(
          await sql`select p.text_content from public.passages p where p.document_id in ('s1','s6')`,
        ).toHaveLength(0)
        expect(
          (
            await sql`select p.text_content from public.passages p where p.org_id='org-b' and p.document_id='pod-novartis-2025'`
          ).length,
        ).toBeGreaterThan(0)
      }),
    60000,
  )
})
