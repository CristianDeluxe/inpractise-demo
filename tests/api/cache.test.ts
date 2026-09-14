import { describe, expect, it } from 'vitest'
import { passageEtag } from '../../server/api/passageEtag.ts'
import { apiRequestFixture } from './apiRequestFixture.ts'
import { backendDataFixture } from './backendDataFixture.ts'
import { facadeFixture } from './facadeFixture.ts'
import { passagePathFixture } from './passagePathFixture.ts'
import { tokenFixture } from './tokenFixture.ts'

describe('private passage validators', () => {
  it('uses immutable identity with deterministic bytes, excluding mutable metadata', async () => {
    const { handle } = facadeFixture()
    const response = await handle(apiRequestFixture(passagePathFixture))
    expect(response.headers.get('etag')).toBe(
      '"passage-v2-WyJkZW1vLW9yZyIsIm5vcnRoc3RhciIsInJldi0xIiwicC0xIl0"',
    )
    expect(response.headers.get('vary')).toBe('Authorization')
    const body: unknown = await response.json()
    expect(body).not.toHaveProperty('isCurrentRevision')
    expect(body).not.toHaveProperty('requestId')
  })
  it.each(['strong', 'weak', 'list', 'star'])(
    'returns authorized 304 for %s condition',
    async (condition) => {
      const { handle, transport } = facadeFixture()
      const { isCurrentRevision: _current, ...data } =
        backendDataFixture('read')
      const etag = passageEtag(data, 'demo-org')
      const conditions = {
        strong: etag,
        weak: `W/${etag}`,
        list: `"different", ${etag}`,
        star: '*',
      }
      const response = await handle(
        apiRequestFixture(passagePathFixture, {
          headers: {
            'if-none-match': conditions[condition as keyof typeof conditions],
          },
        }),
      )
      expect(response.status).toBe(304)
      expect(await response.text()).toBe('')
      expect(transport).toHaveBeenCalledTimes(2)
    },
  )
  it('never lets a matching validator bypass revocation or another principal denial', async () => {
    const { handle, transport } = facadeFixture()
    const first = await handle(apiRequestFixture(passagePathFixture))
    transport.mockImplementation(async () =>
      Promise.resolve(
        Response.json(
          {
            error: {
              code: 'not_found',
              message: 'Not found',
              retryable: false,
            },
            requestId: 'revoked-id',
          },
          { status: 404 },
        ),
      ),
    )
    const revoked = await handle(
      apiRequestFixture(passagePathFixture, {
        headers: {
          authorization: tokenFixture('other'),
          'if-none-match': first.headers.get('etag') ?? '',
        },
      }),
    )
    expect(revoked.status).toBe(404)
    expect(revoked.headers.get('cache-control')).toBe('no-store')
    expect(revoked.headers.get('etag')).toBeNull()
  })
})
