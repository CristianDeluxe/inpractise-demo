import { describe, expect, it, vi } from 'vitest'
import { z } from 'zod'
import { ApiError } from './ApiError.ts'
import { clientFixture } from './clientFixture.ts'
import { researchTransport } from './researchTransport.ts'
import { successFixture } from './successFixture.ts'
import { validateProviderAnswer } from './validators/validateProviderAnswer.ts'

describe('authenticated research transport', () => {
  it('posts the exact request with the current session and retains the envelope', async () => {
    const fetch = vi
      .fn<typeof globalThis.fetch>()
      .mockResolvedValue(successFixture({ ok: true }))
    const client = clientFixture(fetch)
    const response = await researchTransport(
      client,
      { action: 'me' },
      (value) => z.strictObject({ ok: z.boolean() }).parse(value),
    )
    expect(response).toEqual({
      action: 'me',
      data: { ok: true },
      buildId: 'build-test',
      requestId: 'request-test',
    })
    expect(fetch).toHaveBeenCalledWith(
      'https://example.supabase.co/functions/v1/research',
      expect.objectContaining({
        method: 'POST',
        body: '{"action":"me"}',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer test-session',
          apikey: 'test-publishable-key',
        },
        redirect: 'error',
        cache: 'no-store',
        credentials: 'omit',
      }),
    )
  })
  it.each([
    [401, 'invalid_session'],
    [403, 'forbidden'],
    [404, 'passage_not_found'],
    [422, 'bad_input'],
    [429, 'allowance_exhausted'],
    [502, 'invalid_model_answer'],
    [503, 'dependency_failure'],
    [500, 'http_error'],
  ] as const)('maps HTTP %i to %s', async (status, code) => {
    const client = clientFixture(async () =>
      Promise.resolve(
        Response.json(
          {
            error: {
              code: 'SERVER_CODE',
              message: 'Safe server message',
              retryable: status === 503,
            },
            requestId: 'req-error',
          },
          { status },
        ),
      ),
    )
    await expect(
      researchTransport(client, { action: 'me' }, (value) => value),
    ).rejects.toMatchObject({
      code,
      status,
      requestId: 'req-error',
      serverCode: 'SERVER_CODE',
    })
  })
  it('retains HTTP identity when error JSON is malformed', async () => {
    const client = clientFixture(async () =>
      Promise.resolve(new Response('not JSON', { status: 404 })),
    )
    await expect(
      researchTransport(client, { action: 'me' }, (value) => value),
    ).rejects.toMatchObject({ code: 'passage_not_found', status: 404 })
  })
  it('distinguishes network failure from a valid not_found answer', async () => {
    const failure = clientFixture(async () => {
      await Promise.resolve()

      throw new TypeError('network')
    })
    await expect(
      researchTransport(
        failure,
        { action: 'ask', query: 'Question' },
        (value) => value,
      ),
    ).rejects.toBeInstanceOf(ApiError)
    await expect(
      researchTransport(
        failure,
        { action: 'ask', query: 'Question' },
        (value) => value,
      ),
    ).rejects.toMatchObject({ code: 'network' })
    const success = clientFixture(async () =>
      Promise.resolve(
        successFixture(
          { status: 'not_found', claims: [], missingEvidence: [] },
          'ask',
        ),
      ),
    )
    await expect(
      researchTransport(
        success,
        { action: 'ask', query: 'Question' },
        (value) => validateProviderAnswer(value, new Set()),
      ),
    ).resolves.toMatchObject({ data: { status: 'not_found' } })
  })
  it('rejects malformed successful JSON and mismatched envelopes', async () => {
    await expect(
      researchTransport(
        clientFixture(async () => Promise.resolve(new Response('not JSON'))),
        { action: 'me' },
        (value) => value,
      ),
    ).rejects.toMatchObject({ code: 'protocol' })
    await expect(
      researchTransport(
        clientFixture(async () => Promise.resolve(successFixture({}, 'debug'))),
        { action: 'me' },
        (value) => value,
      ),
    ).rejects.toMatchObject({ code: 'protocol' })
  })
  it('does not send invalid input or missing sessions', async () => {
    const fetch = vi.fn<typeof globalThis.fetch>()
    const client = clientFixture(fetch, () => null)
    await expect(
      researchTransport(client, { action: 'me' }, (value) => value),
    ).rejects.toMatchObject({ code: 'invalid_session' })
    await expect(
      researchTransport(
        client,
        { action: 'search', query: 'x', limit: 11 },
        (value) => value,
      ),
    ).rejects.toMatchObject({ code: 'bad_input' })
    await expect(
      researchTransport(
        client,
        { action: 'me', userId: 'forged' } as never,
        (value) => value,
      ),
    ).rejects.toMatchObject({ code: 'bad_input' })
    expect(fetch).not.toHaveBeenCalled()
  })
})
