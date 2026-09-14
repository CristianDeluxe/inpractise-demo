import { describe, expect, it } from 'vitest'
import { asPrincipal } from '../database/asPrincipal.ts'
import { seedTransactionPrincipal } from '../database/seedTransactionPrincipal.ts'
import { denialMessage } from './denialMessage.ts'
import { fixtureRevisionId } from './fixtureRevisionId.ts'
import { seedAuthorizationFixture } from './seedAuthorizationFixture.ts'
import { withLocalRollback } from './withLocalRollback.ts'

describe('local authorization over real SQL', () => {
  it('denies the anonymous role every evidence table', async () => {
    await withLocalRollback(async (sql) => {
      await seedAuthorizationFixture(sql)
      await sql`set local role anon`
      for (const table of [
        'organisations',
        'memberships',
        'documents',
        'passages',
      ])
        expect(
          await denialMessage(
            sql,
            async (scoped) =>
              await scoped.unsafe(`select * from public.${table}`),
          ),
        ).toMatch(/permission denied/)
    })
  })

  it('shows a member its own organization and nothing of the other', async () => {
    await withLocalRollback(async (sql) => {
      await seedAuthorizationFixture(sql)
      const member = await seedTransactionPrincipal(sql, 'org-a')
      await asPrincipal(sql, member)
      const documents = await sql`select org_id from public.documents`
      expect(documents.map((row): unknown => row['org_id'])).toEqual(['org-a'])
    })
  })

  it('hides premium passages from a basic member and shows them to a premium one', async () => {
    await withLocalRollback(async (sql) => {
      await seedAuthorizationFixture(sql)
      const basic = await seedTransactionPrincipal(sql, 'org-a')
      await asPrincipal(sql, basic)
      const denied =
        await sql`select passage_id from public.passages where document_id='premium-doc'`
      expect(denied).toEqual([])
      await sql`reset role`
      const premium = await seedTransactionPrincipal(sql, 'org-a', true)
      await asPrincipal(sql, premium)
      const allowed =
        await sql`select passage_id from public.passages where document_id='premium-doc'`
      expect(allowed.map((row): unknown => row['passage_id'])).toEqual(['P1'])
    })
  })

  it('refuses member writes to evidence', async () => {
    await withLocalRollback(async (sql) => {
      await seedAuthorizationFixture(sql)
      const member = await seedTransactionPrincipal(sql, 'org-a', true)
      await asPrincipal(sql, member)
      expect(
        await denialMessage(
          sql,
          async (scoped) =>
            await scoped`delete from public.passages where document_id='basic-doc'`,
        ),
      ).toMatch(/permission denied/)
      expect(
        await denialMessage(
          sql,
          async (scoped) =>
            await scoped`update public.documents set required_tier='basic' where document_id='premium-doc'`,
        ),
      ).toMatch(/permission denied/)
    })
  })

  it('refuses a self-promotion attempt', async () => {
    await withLocalRollback(async (sql) => {
      await seedAuthorizationFixture(sql)
      const member = await seedTransactionPrincipal(sql, 'org-a')
      await asPrincipal(sql, member)
      expect(
        await denialMessage(
          sql,
          async (scoped) =>
            await scoped`update public.memberships set role='reviewer', premium=true where user_id=${member}`,
        ),
      ).toMatch(/permission denied/)
    })
  })

  it('keeps premium evidence out of the restricted search path', async () => {
    await withLocalRollback(async (sql) => {
      await seedAuthorizationFixture(sql)
      const premium = await seedTransactionPrincipal(sql, 'org-a', true)
      await asPrincipal(sql, premium)
      const scoped =
        await sql`select document_id from public.search_candidates_scoped('migration')`
      expect(scoped.map((row): unknown => row['document_id'])).toEqual([
        'basic-doc',
      ])
      const full =
        await sql`select document_id from public.search_candidates('migration')`
      expect(full.map((row): unknown => row['document_id']).sort()).toEqual([
        'basic-doc',
        'premium-doc',
      ])
    })
  })

  it('reserves publication for the service role', async () => {
    await withLocalRollback(async (sql) => {
      await seedAuthorizationFixture(sql)
      const reviewer = await seedTransactionPrincipal(
        sql,
        'org-a',
        true,
        'reviewer',
      )
      await asPrincipal(sql, reviewer)
      expect(
        await denialMessage(
          sql,
          async (scoped) =>
            await scoped`select public.publish_document('org-a','basic-doc',${fixtureRevisionId},1,${'b'.repeat(64)})`,
        ),
      ).toMatch(/permission denied/)
    })
  })
})
