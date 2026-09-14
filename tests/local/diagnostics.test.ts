import { describe, expect, it } from 'vitest'
import { asPrincipal } from '../database/asPrincipal.ts'
import { seedTransactionPrincipal } from '../database/seedTransactionPrincipal.ts'
import { denialMessage } from './denialMessage.ts'
import { diagnosticsPayload } from './diagnosticsPayload.ts'
import { seedAuthorizationFixture } from './seedAuthorizationFixture.ts'
import { withLocalRollback } from './withLocalRollback.ts'

describe('request diagnostics ledger', () => {
  it('records a diagnostic record against the caller own request', async () => {
    await withLocalRollback(async (sql) => {
      await seedAuthorizationFixture(sql)
      const member = await seedTransactionPrincipal(sql, 'org-a')
      await asPrincipal(sql, member)
      const [debited] = await sql`select public.debit_request() as request_id`
      const request = debited?.['request_id'] as string
      await sql`select public.record_request_diagnostics(${request},${sql.json(diagnosticsPayload())})`
      const [row] =
        await sql`select diagnostics from public.request_usage where request_id=${request}`
      expect(row?.['diagnostics']).toEqual(diagnosticsPayload())
    })
  })

  it('refuses a second write to the same request', async () => {
    await withLocalRollback(async (sql) => {
      await seedAuthorizationFixture(sql)
      const member = await seedTransactionPrincipal(sql, 'org-a')
      await asPrincipal(sql, member)
      const [debited] = await sql`select public.debit_request() as request_id`
      const request = debited?.['request_id'] as string
      await sql`select public.record_request_diagnostics(${request},${sql.json(diagnosticsPayload())})`
      expect(
        await denialMessage(
          sql,
          async (scoped) =>
            await scoped`select public.record_request_diagnostics(${request},${scoped.json(diagnosticsPayload())})`,
        ),
      ).toMatch(/usage_not_available/)
    })
  })

  it('refuses another principal request and an unbounded payload', async () => {
    await withLocalRollback(async (sql) => {
      await seedAuthorizationFixture(sql)
      const owner = await seedTransactionPrincipal(sql, 'org-a')
      await asPrincipal(sql, owner)
      const [debited] = await sql`select public.debit_request() as request_id`
      const request = debited?.['request_id'] as string
      expect(
        await denialMessage(
          sql,
          async (scoped) =>
            await scoped`select public.record_request_diagnostics(${request},${scoped.json({ padding: 'x'.repeat(5000) })})`,
        ),
      ).toMatch(/invalid_diagnostics/)
      await sql`reset role`
      const stranger = await seedTransactionPrincipal(sql, 'org-a')
      await asPrincipal(sql, stranger)
      expect(
        await denialMessage(
          sql,
          async (scoped) =>
            await scoped`select public.record_request_diagnostics(${request},${scoped.json(diagnosticsPayload())})`,
        ),
      ).toMatch(/usage_not_available/)
    })
  })

  it('keeps one principal diagnostics out of another reader reach', async () => {
    await withLocalRollback(async (sql) => {
      await seedAuthorizationFixture(sql)
      const owner = await seedTransactionPrincipal(sql, 'org-a')
      await asPrincipal(sql, owner)
      const [debited] = await sql`select public.debit_request() as request_id`
      await sql`select public.record_request_diagnostics(${debited?.['request_id'] as string},${sql.json(diagnosticsPayload())})`
      await sql`reset role`
      const other = await seedTransactionPrincipal(sql, 'org-a')
      await asPrincipal(sql, other)
      const visible = await sql`select request_id from public.request_usage`
      expect(visible).toEqual([])
    })
  })
})
