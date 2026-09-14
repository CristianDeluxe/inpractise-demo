import { problemSchema } from '@/http-api/problemSchema.ts'
import { describe, expect, it } from 'vitest'
import { apiRequestFixture } from './apiRequestFixture.ts'
import { facadeFixture } from './facadeFixture.ts'

describe('HTTP problems', () => {
  it('rejects missing bearer before any backend call', async () => {
    const { handle, transport } = facadeFixture()
    const response = await handle(new Request('http://localhost/api/v1/me'))
    expect(response.status).toBe(401)
    expect(response.headers.get('www-authenticate')).toBe('Bearer')
    expect(problemSchema.parse(await response.json()).code).toBe(
      'unauthenticated',
    )
    expect(transport).not.toHaveBeenCalled()
  })
  it.each([
    [401, 'unauthenticated'],
    [403, 'forbidden'],
    [404, 'not_found'],
    [429, 'allowance_exhausted'],
    [502, 'invalid_model_answer'],
    [503, 'dependency_failure'],
  ] as const)('preserves backend %s %s', async (status, code) => {
    const { handle } = facadeFixture({
      fetch: async () =>
        Promise.resolve(
          Response.json(
            {
              error: {
                code,
                message: 'Backend fixture failure.',
                retryable: status >= 429,
              },
              requestId: 'backend-failure-id',
            },
            { status },
          ),
        ),
    })
    const response = await handle(
      apiRequestFixture('answers', {
        method: 'POST',
        body: '{"query":"evidence"}',
      }),
    )
    expect(response.status).toBe(status)
    expect(response.headers.get('content-type')).toBe(
      'application/problem+json',
    )
    expect(response.headers.get('x-request-id')).toBe('backend-failure-id')
    expect(problemSchema.parse(await response.json())).toMatchObject({
      code,
      status,
      type: `urn:inpractise-demo:problem:${code}`,
      requestId: 'backend-failure-id',
      correlationId: 'caller-id',
    })
  })
  it('returns dependency problems for transport failure and malformed success', async () => {
    const failed = facadeFixture({
      fetch: async () => Promise.reject(new Error('private diagnostic')),
    })
    const failure = await failed.handle(apiRequestFixture('me'))
    expect(failure.status).toBe(503)
    expect(await failure.text()).not.toContain('private diagnostic')
    const invalid = facadeFixture({
      fetch: async () => Promise.resolve(Response.json({})),
    })
    expect((await invalid.handle(apiRequestFixture('me'))).status).toBe(502)
  })
  it('rejects provider failure after accepted authentication', async () => {
    const { handle, transport } = facadeFixture()
    transport.mockImplementationOnce(async () =>
      Promise.resolve(
        Response.json({
          action: 'me',
          data: { orgId: 'demo', role: 'member', premium: false },
          requestId: 'me-id',
          buildId: 'fixture',
        }),
      ),
    )
    transport.mockImplementationOnce(async () =>
      Promise.resolve(
        Response.json(
          {
            error: {
              code: 'dependency_failure',
              message: 'Provider unavailable',
              retryable: true,
            },
            requestId: 'provider-id',
          },
          { status: 503 },
        ),
      ),
    )
    const response = await handle(
      apiRequestFixture('answers', {
        method: 'POST',
        body: '{"query":"evidence"}',
      }),
    )
    expect(response.status).toBe(503)
    expect(await response.json()).toMatchObject({
      code: 'dependency_failure',
      requestId: 'provider-id',
    })
  })
})
