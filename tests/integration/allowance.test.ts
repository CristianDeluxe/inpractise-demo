import { describe, expect, it } from 'vitest'
import { asPrincipal } from '../database/asPrincipal.ts'
import { seedTransactionPrincipal } from '../database/seedTransactionPrincipal.ts'
import { withRollback } from '../database/withRollback.ts'

describe('database Ask allowances', () => {
  it('retains a debit after provider failure, records real usage once and enforces exhaustion', async () => {
    await withRollback(async (sql) => {
      const userId = await seedTransactionPrincipal(sql, 'org-a')
      await asPrincipal(sql, userId)
      const debit = await sql`select public.debit_request() as id`
      const request = String(debit[0]?.['id'])
      await expect(
        Promise.reject(new Error('provider failed')),
      ).rejects.toThrow('provider failed')
      expect(await sql`select total_tokens from public.request_usage`).toEqual([
        { total_tokens: null },
      ])
      await sql`select public.record_request_usage(${request},12,3,15)`
      expect(await sql`select total_tokens from public.request_usage`).toEqual([
        { total_tokens: '15' },
      ])
      await expect(
        sql.savepoint(async (tx) => {
          await tx`select public.record_request_usage(${request},1,1,2)`
        }),
      ).rejects.toMatchObject({ code: '42501' })
      await sql`reset role`
      await sql`insert into public.request_usage(user_id) select ${userId}::uuid from generate_series(1,99)`
      await asPrincipal(sql, userId)
      await expect(
        sql.savepoint(async (tx) => {
          await tx`select public.debit_request()`
        }),
      ).rejects.toMatchObject({ message: 'allowance_exhausted' })
      expect(
        await sql`select count(*)::int as count from public.request_usage`,
      ).toEqual([{ count: 100 }])
    })
  }, 60000)

  it('denies cross-principal reads, direct mutations and anonymous debits', async () => {
    await withRollback(async (sql) => {
      const first = await seedTransactionPrincipal(sql, 'org-a')
      const second = await seedTransactionPrincipal(sql, 'org-a')
      await asPrincipal(sql, first)
      const debit = await sql`select public.debit_request() as id`
      await sql`reset role`
      await asPrincipal(sql, second)
      expect(await sql`select * from public.request_usage`).toHaveLength(0)
      await expect(
        sql.savepoint(async (tx) => {
          await tx`select public.record_request_usage(${String(debit[0]?.['id'])},1,1,2)`
        }),
      ).rejects.toMatchObject({ code: '42501' })
      await expect(
        sql.savepoint(async (tx) => {
          await tx`delete from public.request_usage`
        }),
      ).rejects.toMatchObject({ code: '42501' })
      await sql`reset role`
      await sql`set local role anon`
      await expect(
        sql.savepoint(async (tx) => {
          await tx`select public.debit_request()`
        }),
      ).rejects.toMatchObject({ code: '42501' })
    })
  }, 60000)
})
