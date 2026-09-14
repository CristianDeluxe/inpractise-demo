import { describe, expect, it } from 'vitest'
import { apiRequestFixture } from './apiRequestFixture.ts'
import { facadeFixture } from './facadeFixture.ts'
import { tokenFixture } from './tokenFixture.ts'

describe('single-process principal limits', () => {
  it('shares quota across refreshed tokens, isolates principals and resets', async () => {
    let now = 0
    const { handle } = facadeFixture({ limit: 1, now: () => now })
    const first = await handle(apiRequestFixture('me'))
    expect(first.headers.get('ratelimit-policy')).toBe('"principal";q=1;w=60')
    expect(first.headers.get('ratelimit')).toBe('"principal";r=0;t=60')
    const limited = await handle(
      apiRequestFixture('me', {
        headers: { authorization: tokenFixture('member-one', 'refreshed') },
      }),
    )
    expect(limited.status).toBe(429)
    expect(limited.headers.get('retry-after')).toBe('60')
    expect(await limited.json()).toMatchObject({ code: 'rate_limited' })
    expect(
      (
        await handle(
          apiRequestFixture('me', {
            headers: { authorization: tokenFixture('member-two') },
          }),
        )
      ).status,
    ).toBe(200)
    now = 60000
    expect((await handle(apiRequestFixture('me'))).status).toBe(200)
  })
  it('atomically bounds concurrent calls and refuses capacity overflow', async () => {
    const { handle } = facadeFixture({ limit: 1, maxPrincipals: 1 })
    const responses = await Promise.all([
      handle(apiRequestFixture('me')),
      handle(apiRequestFixture('me')),
    ])
    expect(responses.map((response) => response.status).toSorted()).toEqual([
      200, 429,
    ])
    expect(
      (
        await handle(
          apiRequestFixture('me', {
            headers: { authorization: tokenFixture('new-member') },
          }),
        )
      ).status,
    ).toBe(503)
  })
})
