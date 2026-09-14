import { openApiDocument } from '@/http-api/openApiDocument.ts'
import { operations } from '@/http-api/operations.ts'
import { describe, expect, it } from 'vitest'
import { apiRequestFixture } from './apiRequestFixture.ts'
import { facadeFixture } from './facadeFixture.ts'

describe('HTTP endpoint contracts', () => {
  it.each([
    ['documents', 'GET', 'documents', undefined],
    [
      'passage',
      'GET',
      'documents/northstar/revisions/rev-1/passages/p-1',
      undefined,
    ],
    ['search', 'POST', 'search', { query: 'evidence' }],
    ['answers', 'POST', 'answers', { query: 'evidence' }],
    ['me', 'GET', 'me', undefined],
    ['health', 'GET', 'health', undefined],
  ] as const)(
    'validates %s output and correlation',
    async (name, method, path, body) => {
      const { handle } = facadeFixture()
      const response = await handle(
        apiRequestFixture(path, {
          method,
          ...(body ? { body: JSON.stringify(body) } : {}),
        }),
      )
      expect(response.status).toBe(200)
      expect(
        operations[name].output.safeParse(await response.json()).success,
      ).toBe(true)
      expect(response.headers.get('x-correlation-id')).toBe('caller-id')
      expect(response.headers.get('cache-control')).toBe(
        name === 'passage' ? 'private, no-cache' : 'no-store',
      )
    },
  )
  it('serves generated OpenAPI and liveness without backend access', async () => {
    const { handle, transport } = facadeFixture()
    const spec = await handle(
      new Request('http://localhost/api/v1/openapi.json'),
    )
    expect(await spec.json()).toEqual(openApiDocument)
    const health = await handle(new Request('http://localhost/api/v1/health'))
    expect(await health.json()).toEqual({
      status: 'ok',
      scope: 'facade-only',
      backendChecked: false,
    })
    expect(transport).not.toHaveBeenCalled()
    expect(health.headers.get('x-request-id')).toMatch(/^[\da-f-]{36}$/)
  })
  it('forwards caller bearer and request ID unchanged, without a key', async () => {
    const { handle, transport } = facadeFixture()
    const request = apiRequestFixture('me')
    await handle(request)
    expect(transport).toHaveBeenCalledExactlyOnceWith(
      'http://fixture.invalid/functions/v1/research',
      expect.objectContaining({
        headers: {
          authorization: request.headers.get('authorization'),
          'content-type': 'application/json',
          'x-request-id': 'caller-id',
        },
        redirect: 'error',
      }),
    )
  })
  it.each(['debug', 'missing'])('excludes %s routes', async (path) => {
    const { handle } = facadeFixture()
    expect((await handle(apiRequestFixture(path))).status).toBe(404)
  })
  it.each([
    ['search', { method: 'GET' }, 405],
    ['me?role=reviewer', {}, 422],
    ['documents?kind=secret', {}, 422],
    ['documents?company=a&company=b', {}, 422],
    ['search', { method: 'POST', body: '{' }, 422],
    [
      'search',
      { method: 'POST', body: '{}', headers: { 'content-type': 'text/plain' } },
      415,
    ],
    ['search', { method: 'POST', body: '{"query":"x","orgId":"other"}' }, 422],
  ] as const)('rejects invalid %s', async (path, init, status) => {
    const { handle, transport } = facadeFixture()
    expect((await handle(apiRequestFixture(path, init))).status).toBe(status)
    expect(transport).not.toHaveBeenCalled()
  })
})
