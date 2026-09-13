import { describe, expect, it, vi } from 'vitest'
import { expectCancellation } from '../../tests/assertions/expectCancellation.ts'
import { clientFixture } from './clientFixture.ts'
import { createRequestScope } from './createRequestScope.ts'
import { researchTransport } from './researchTransport.ts'
import { successFixture } from './successFixture.ts'

describe('local cancellation and late completion', () => {
  it('rejects immediately while token access is pending and never dispatches afterward', async () => {
    const token = Promise.withResolvers<string>()
    const fetch = vi.fn<typeof globalThis.fetch>()
    const controller = new AbortController()
    const pending = researchTransport(
      clientFixture(fetch, async () => token.promise),
      { action: 'me' },
      (value) => value,
      { signal: controller.signal },
    )
    const rejected = expectCancellation(pending)
    await Promise.resolve()
    controller.abort()
    await rejected
    token.resolve('late-session')
    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(fetch).not.toHaveBeenCalled()
  })
  it('ignores a fetch that disregards abort', async () => {
    const response = Promise.withResolvers<Response>()
    const started = Promise.withResolvers<undefined>()
    const validate = vi.fn((value: unknown) => value)
    const controller = new AbortController()
    const pending = researchTransport(
      clientFixture(async () => {
        started.resolve(undefined)
        return response.promise
      }),
      { action: 'me' },
      validate,
      { signal: controller.signal },
    )
    const rejected = expectCancellation(pending)
    await started.promise
    controller.abort()
    await rejected
    response.resolve(successFixture({ late: true }))
    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(validate).not.toHaveBeenCalled()
  })
  it('ignores response body completion after cancellation', async () => {
    const body = Promise.withResolvers<unknown>()
    const started = Promise.withResolvers<undefined>()
    const response = successFixture({})
    vi.spyOn(response, 'json').mockImplementation(async () => {
      started.resolve(undefined)
      return body.promise
    })
    const controller = new AbortController()
    const validate = vi.fn((value: unknown) => value)
    const pending = researchTransport(
      clientFixture(async () => Promise.resolve(response)),
      { action: 'me' },
      validate,
      { signal: controller.signal },
    )
    const rejected = expectCancellation(pending)
    await started.promise
    controller.abort()
    await rejected
    body.resolve({
      action: 'me',
      data: { late: true },
      buildId: 'build',
      requestId: 'late',
    })
    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(validate).not.toHaveBeenCalled()
  })
  it('supersedes only requests sharing one scope', async () => {
    const old = Promise.withResolvers<Response>()
    const started = Promise.withResolvers<undefined>()
    const fetch = vi
      .fn<typeof globalThis.fetch>()
      .mockImplementationOnce(async () => {
        started.resolve(undefined)
        return old.promise
      })
      .mockImplementation(async () =>
        Promise.resolve(successFixture({ new: true })),
      )
    const client = clientFixture(fetch)
    const scope = createRequestScope()
    const first = researchTransport(
      client,
      { action: 'me' },
      (value) => value,
      { scope },
    )
    const rejected = expectCancellation(first)
    await started.promise
    await expect(
      researchTransport(client, { action: 'me' }, (value) => value, { scope }),
    ).resolves.toMatchObject({ data: { new: true } })
    await rejected
    expect(client.sequence).toBe(2)
    old.resolve(successFixture({ old: true }))
    const a = createRequestScope()
    const b = createRequestScope()
    const independent = await Promise.all([
      researchTransport(client, { action: 'me' }, (value) => value, {
        scope: a,
      }),
      researchTransport(client, { action: 'me' }, (value) => value, {
        scope: b,
      }),
    ])
    expect(independent).toHaveLength(2)
  })
  it('rejects pre-aborted requests without reading a session', async () => {
    const token = vi.fn(() => 'session')
    const controller = new AbortController()
    controller.abort()
    await expect(
      researchTransport(
        clientFixture(vi.fn(), token),
        { action: 'me' },
        (value) => value,
        { signal: controller.signal },
      ),
    ).rejects.toMatchObject({ code: 'cancelled' })
    expect(token).not.toHaveBeenCalled()
  })
})
