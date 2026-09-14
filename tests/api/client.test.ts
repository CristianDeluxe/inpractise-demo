import { citationFixture } from '@/api/citationFixture.ts'
import { createHttpClient } from '@/http-api/createHttpClient.ts'
import { HttpProblemError } from '@/http-api/HttpProblemError.ts'
import { describe, expect, it } from 'vitest'
import { clientOptionsFixture } from './clientOptionsFixture.ts'
import { facadeFixture } from './facadeFixture.ts'

describe('typed HTTP client', () => {
  it.each(['documents', 'me', 'health'] as const)(
    'parses %s through the facade',
    async (name) => {
      const client = createHttpClient(clientOptionsFixture())
      const result = await client(name, {})
      expect(result.status).toBe(200)
    },
  )
  it('validates passages and conditional results', async () => {
    const client = createHttpClient(clientOptionsFixture())
    const input = {
      documentId: 'northstar',
      revisionId: 'rev-1',
      passageId: 'p-1',
    }
    const first = await client('passage', input)
    expect(first.status).toBe(200)
    const cached = await client('passage', input, { etag: first.etag ?? '' })
    expect(cached.status).toBe(304)
  })
  it.each(['search', 'answers'] as const)(
    'parses %s evidence with the browser validators',
    async (name) => {
      const client = createHttpClient(clientOptionsFixture())
      expect((await client(name, { query: 'evidence' })).status).toBe(200)
    },
  )
  it('throws typed problems and rejects mismatched citation identity', async () => {
    const { handle } = facadeFixture()
    const denied = createHttpClient({
      baseUrl: 'http://localhost',
      getAccessToken: () => null,
      fetch: async (url, init) => handle(new Request(url, init)),
    })
    await expect(denied('me', {})).rejects.toBeInstanceOf(HttpProblemError)
    const invalid = createHttpClient({
      baseUrl: 'http://localhost',
      getAccessToken: () => null,
      fetch: async () =>
        Promise.resolve(
          Response.json(
            {
              items: [citationFixture({ citationId: 'wrong' })],
              mode: 'lexical_only',
              truncated: false,
            },
            { headers: { 'x-request-id': 'id' } },
          ),
        ),
    })
    await expect(invalid('search', { query: 'evidence' })).rejects.toThrow(
      'consistently identified',
    )
  })
})
