import { describe, expect, it } from 'vitest'
import { asPrincipal } from '../database/asPrincipal.ts'
import { seedTransactionPrincipal } from '../database/seedTransactionPrincipal.ts'
import { denialMessage } from './denialMessage.ts'
import { fixtureRevisionId } from './fixtureRevisionId.ts'
import { seedAuthorizationFixture } from './seedAuthorizationFixture.ts'
import { withLocalRollback } from './withLocalRollback.ts'

describe('research notes under real row level security', () => {
  it('lets a basic member save a basic passage and refuses a premium one', async () => {
    await withLocalRollback(async (sql) => {
      await seedAuthorizationFixture(sql)
      const basic = await seedTransactionPrincipal(sql, 'org-a')
      await asPrincipal(sql, basic)
      const [saved] =
        await sql`insert into public.research_notes(org_id,document_id,revision_id,passage_id,question,note)
          values('org-a','basic-doc',${fixtureRevisionId},'P1','Why rebuild?','Keep') returning user_id`
      expect(saved?.['user_id']).toBe(basic)
      expect(
        await denialMessage(
          sql,
          async (scoped) =>
            await scoped`insert into public.research_notes(org_id,document_id,revision_id,passage_id)
              values('org-a','premium-doc',${fixtureRevisionId},'P1')`,
        ),
      ).toMatch(/row-level security/)
    })
  })

  it('lets tier, not role, decide: a premium reviewer saves the premium passage but cannot name another user', async () => {
    await withLocalRollback(async (sql) => {
      await seedAuthorizationFixture(sql)
      const other = await seedTransactionPrincipal(sql, 'org-a')
      const reviewer = await seedTransactionPrincipal(
        sql,
        'org-a',
        true,
        'reviewer',
      )
      await asPrincipal(sql, reviewer)
      const rows =
        await sql`insert into public.research_notes(org_id,document_id,revision_id,passage_id)
          values('org-a','premium-doc',${fixtureRevisionId},'P1') returning note_id`
      expect(rows).toHaveLength(1)
      expect(
        await denialMessage(
          sql,
          async (scoped) =>
            await scoped`insert into public.research_notes(user_id,org_id,document_id,revision_id,passage_id)
              values(${other},'org-a','basic-doc',${fixtureRevisionId},'P1')`,
        ),
      ).toMatch(/row-level security/)
    })
  })

  it('hides one member notes from another and makes their delete a no-op', async () => {
    await withLocalRollback(async (sql) => {
      await seedAuthorizationFixture(sql)
      const owner = await seedTransactionPrincipal(sql, 'org-a')
      await asPrincipal(sql, owner)
      const [note] =
        await sql`insert into public.research_notes(org_id,document_id,revision_id,passage_id)
          values('org-a','basic-doc',${fixtureRevisionId},'P1') returning note_id`
      const noteId = note?.['note_id'] as string
      await sql`reset role`
      const stranger = await seedTransactionPrincipal(sql, 'org-a', true)
      await asPrincipal(sql, stranger)
      expect(await sql`select note_id from public.research_notes`).toEqual([])
      expect(
        await sql`delete from public.research_notes where note_id=${noteId} returning note_id`,
      ).toEqual([])
      await sql`reset role`
      await asPrincipal(sql, owner)
      expect(
        await sql`delete from public.research_notes where note_id=${noteId} returning note_id`,
      ).toHaveLength(1)
    })
  })
})
