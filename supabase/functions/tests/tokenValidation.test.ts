import { assertRejectedToken } from './assertRejectedToken.ts'
import { createExpiredToken } from './createExpiredToken.ts'

Deno.test(
  'handler authentication rejects invalid credentials before evidence access',
  async (test) => {
    await test.step('missing bearer token requires no Auth or evidence request', async () => {
      await assertRejectedToken(null, 'Missing token')
    })
    await test.step('forged token rejected by Auth cannot reach evidence', async () => {
      await assertRejectedToken('forged-test-token', 'Invalid signature')
    })
    await test.step('expired token rejected by Auth cannot reach evidence', async () => {
      const expiredAtSeconds = Math.floor(Date.now() / 1_000) - 60
      const token = createExpiredToken(expiredAtSeconds)
      await assertRejectedToken(token, 'JWT expired', 403)
    })
  },
)
