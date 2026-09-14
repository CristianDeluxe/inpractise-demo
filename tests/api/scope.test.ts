import { describe, expect, it } from 'vitest'
import { apiRequestFixture } from './apiRequestFixture.ts'
import { backendDataFixture } from './backendDataFixture.ts'
import { facadeFixture } from './facadeFixture.ts'
import { passagePathFixture } from './passagePathFixture.ts'

// The read response owns scope; me is deliberately constant across these requests.
describe('read-owned validator scope', () => {
  it('changes ETag when read scope changes and disables caching without scope', async () => {
    const { handle, transport } = facadeFixture()
    const first = await handle(apiRequestFixture(passagePathFixture))
    transport.mockImplementationOnce(async () =>
      Promise.resolve(
        Response.json({
          action: 'me',
          data: backendDataFixture('me'),
          buildId: 'fixture',
          requestId: 'me-id',
        }),
      ),
    )
    transport.mockImplementationOnce(async () =>
      Promise.resolve(
        Response.json(
          {
            action: 'read',
            data: backendDataFixture('read'),
            buildId: 'fixture',
            requestId: 'read-id',
          },
          { headers: { 'x-research-org-id': 'other-org' } },
        ),
      ),
    )
    const switched = await handle(
      apiRequestFixture(passagePathFixture, {
        headers: { 'if-none-match': first.headers.get('etag') ?? '' },
      }),
    )
    expect(switched.status).toBe(200)
    expect(switched.headers.get('etag')).not.toBe(first.headers.get('etag'))
    transport.mockImplementationOnce(async () =>
      Promise.resolve(
        Response.json({
          action: 'me',
          data: backendDataFixture('me'),
          buildId: 'fixture',
          requestId: 'me-id',
        }),
      ),
    )
    transport.mockImplementationOnce(async () =>
      Promise.resolve(
        Response.json({
          action: 'read',
          data: backendDataFixture('read'),
          buildId: 'fixture',
          requestId: 'read-id',
        }),
      ),
    )
    const unscoped = await handle(
      apiRequestFixture(passagePathFixture, {
        headers: { 'if-none-match': first.headers.get('etag') ?? '' },
      }),
    )
    expect(unscoped.status).toBe(200)
    expect(unscoped.headers.get('etag')).toBeNull()
    expect(unscoped.headers.get('cache-control')).toBe('no-store')
  })
  it('preserves backend IDs for locally generated quota and cursor problems', async () => {
    const { handle } = facadeFixture({ limit: 1 })
    await handle(apiRequestFixture('me'))
    const quota = await handle(apiRequestFixture('me'))
    expect(quota.headers.get('x-request-id')).toBe('backend-id')
    expect(await quota.json()).toMatchObject({
      requestId: 'backend-id',
      correlationId: 'caller-id',
    })
    const other = facadeFixture()
    const cursor = await other.handle(
      apiRequestFixture('documents?cursor=broken'),
    )
    expect(await cursor.json()).toMatchObject({
      requestId: 'backend-id',
      correlationId: 'caller-id',
    })
  })
})
