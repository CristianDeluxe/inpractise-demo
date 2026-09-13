import { writeFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { assertRetrievalGate } from '../../scripts/db/assertRetrievalGate.ts'
import { classifyFailure } from '../../scripts/db/classifyFailure.ts'
import { requireValue } from '../assertions/requireValue.ts'
import { asPrincipal } from '../database/asPrincipal.ts'
import { seedTransactionPrincipal } from '../database/seedTransactionPrincipal.ts'
import { withRollback } from '../database/withRollback.ts'

describe('remote transactional database assertions', () => {
  it(
    'enforces tier, organisation and anonymous isolation directly in PostgreSQL',
    async () =>
      withRollback(async (sql) => {
        const basic = await seedTransactionPrincipal(sql, 'org-a')
        const premium = await seedTransactionPrincipal(sql, 'org-a', true)
        const reviewer = await seedTransactionPrincipal(
          sql,
          'org-a',
          false,
          'reviewer',
        )
        const other = await seedTransactionPrincipal(sql, 'org-b')
        await asPrincipal(sql, premium)
        const control =
          await sql`select text_content from public.passages where document_id='s6'`
        expect(
          control.some((p) => String(p['text_content']).includes('ORCHID-74')),
        ).toBe(true)
        for (const id of [basic, reviewer]) {
          await sql`reset role`
          await asPrincipal(sql, id)
          expect(
            await sql`select * from public.passages where document_id='s6'`,
          ).toHaveLength(0)
          expect(
            await sql`select * from public.documents where org_id='org-b'`,
          ).toHaveLength(0)
        }
        await sql`reset role`
        await asPrincipal(sql, other)
        expect(
          await sql`select * from public.documents where org_id='org-a'`,
        ).toHaveLength(0)
        expect(
          (await sql`select * from public.documents`).length,
        ).toBeGreaterThan(0)
        await sql`reset role`
        await sql`set local role anon`
        expect(
          requireValue(
            (
              await sql`select has_table_privilege(current_user,'public.passages','select') as allowed`
            )[0],
          )['allowed'],
        ).toBe(false)
      }),
    60000,
  )
  it(
    'uses current membership despite unchanged JWT claims',
    async () =>
      withRollback(async (sql) => {
        const userId = await seedTransactionPrincipal(sql, 'org-a')
        await asPrincipal(sql, userId)
        expect(
          (await sql`select * from public.passages`).length,
        ).toBeGreaterThan(0)
        await sql`reset role`
        await sql`update public.memberships set active=false where user_id=${userId}`
        await sql`set local role authenticated`
        expect(await sql`select * from public.passages`).toHaveLength(0)
        expect(
          await sql`select * from public.search_candidates('migration')`,
        ).toHaveLength(0)
      }),
    60000,
  )
  it(
    'detects gold removal from actual FTS candidates and fails the retrieval gate',
    async () =>
      withRollback(async (sql) => {
        const userId = await seedTransactionPrincipal(sql, 'org-a')
        await asPrincipal(sql, userId)
        const gold =
          await sql`select revision_id from public.document_revisions where document_id='s1' and is_current`
        expect(gold).toHaveLength(1)
        const rows =
          await sql`select * from public.search_candidates('rebuilding integrations retraining')`
        const input = {
          goldIds: [`s1:${String(requireValue(gold[0])['revision_id'])}:P2`],
          candidateIds: rows.map(
            (r) =>
              `${String(r['document_id'])}:${String(r['revision_id'])}:${String(r['passage_id'])}`,
          ),
          contextIds: rows.map(
            (r) =>
              `${String(r['document_id'])}:${String(r['revision_id'])}:${String(r['passage_id'])}`,
          ),
        }
        expect(() => {
          assertRetrievalGate(input)
        }).not.toThrow()
        writeFileSync(
          'supabase/.temp/gold-positive.json',
          JSON.stringify(
            {
              ...input,
              target: 'remote',
              authentication: 'transaction-local SQL fixture',
              diagnosis: classifyFailure(input),
            },
            null,
            2,
          ),
        )
        input.candidateIds = input.candidateIds.filter(
          (id) => !input.goldIds.includes(id),
        )
        expect(classifyFailure(input)).toBe('retrieval_miss')
        expect(() => {
          assertRetrievalGate(input)
        }).toThrow('retrieval_miss')
        writeFileSync(
          'supabase/.temp/gold-drop.json',
          JSON.stringify(
            {
              ...input,
              target: 'remote',
              authentication: 'transaction-local SQL fixture',
              diagnosis: classifyFailure(input),
            },
            null,
            2,
          ),
        )
      }),
    60000,
  )
})
