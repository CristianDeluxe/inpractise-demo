import { describe, expect, it } from 'vitest'
import { loadTarget } from '../../scripts/db/loadTarget.ts'
import { signInPersona } from '../../scripts/db/signInPersona.ts'
import { asPrincipal } from '../database/asPrincipal.ts'
import { withRollback } from '../database/withRollback.ts'

describe('concurrent allowance requests', () => {
  it('holds the last unit against another connection until the winner rolls back', async () => {
    const { userId } = await signInPersona(loadTarget(), 'basic')
    await withRollback(async (winner) => {
      await winner`delete from public.request_usage where user_id=${userId}`
      await winner`insert into public.request_usage(user_id) select ${userId}::uuid from generate_series(1,99)`
      await asPrincipal(winner, userId)
      await winner`select public.debit_request()`
      const [definition] = await winner`
        select pg_get_functiondef(
          'public.debit_request()'::regprocedure
        ) as definition
      `
      const functionDefinition = String(definition?.['definition'])
      const lockPosition = functionDefinition.indexOf('pg_advisory_xact_lock')
      const countPosition = functionDefinition.indexOf('count(*)')
      expect(lockPosition).toBeGreaterThanOrEqual(0)
      expect(countPosition).toBeGreaterThan(lockPosition)
      await withRollback(async (loser) => {
        await loser`set local lock_timeout='500ms'`
        await asPrincipal(loser, userId)
        await expect(
          loser.savepoint(async (tx) => {
            await tx`select public.debit_request()`
          }),
        ).rejects.toMatchObject({ code: '55P03' })
      })
      await expect(
        winner.savepoint(async (tx) => {
          await tx`select public.debit_request()`
        }),
      ).rejects.toMatchObject({ message: 'allowance_exhausted' })
      expect(
        await winner`select count(*)::int as count from public.request_usage`,
      ).toEqual([{ count: 100 }])
    })
  }, 60000)
})
