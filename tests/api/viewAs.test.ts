import { createHttpClient } from '@/http-api/createHttpClient.ts'
import { describe, expect, it } from 'vitest'
import { apiRequestFixture } from './apiRequestFixture.ts'
import { facadeFixture } from './facadeFixture.ts'
import { passagePathFixture } from './passagePathFixture.ts'
import { tokenFixture } from './tokenFixture.ts'

describe('downgrade-only facade scope', () => {
  it.each(['me', 'documents', 'search', 'answers', 'passage'] as const)(
    'forwards viewAs unchanged for %s, including identity validation',
    async (name) => {
      const { handle, transport } = facadeFixture()
      const viewAs = { role: 'member', premium: false } as const
      const client = createHttpClient({
        baseUrl: 'http://localhost',
        getAccessToken: () => tokenFixture().slice(7),
        fetch: async (url, init) => handle(new Request(url, init)),
      })
      const result = await client(name, {
        viewAs,
        ...(name === 'search' || name === 'answers'
          ? { query: 'evidence' }
          : {}),
        ...(name === 'passage'
          ? { documentId: 'northstar', revisionId: 'rev-1', passageId: 'p-1' }
          : {}),
      })
      expect(result.status).toBe(200)
      expect(transport).toHaveBeenCalledTimes(name === 'me' ? 1 : 2)
      for (const [, init] of transport.mock.calls) {
        expect(
          JSON.parse(typeof init?.body === 'string' ? init.body : '{}'),
        ).toHaveProperty('viewAs', viewAs)
      }
    },
  )
  it('separates all three viewing modes and never reuses the full-access validator', async () => {
    const { handle } = facadeFixture()
    const full = await handle(apiRequestFixture(passagePathFixture))
    const tags = new Set([full.headers.get('etag')])
    for (const viewAs of [
      { role: 'member' },
      { role: 'member', premium: false },
    ]) {
      const response = await handle(
        apiRequestFixture(
          `${passagePathFixture}?viewAs=${encodeURIComponent(JSON.stringify(viewAs))}`,
          { headers: { 'if-none-match': full.headers.get('etag') ?? '' } },
        ),
      )
      expect(response.status).toBe(200)
      tags.add(response.headers.get('etag'))
    }
    expect(tags.size).toBe(3)
  })
  it.each([{ role: 'reviewer' }, { premium: true }, { orgId: 'foreign' }])(
    'rejects an escalation before calling the backend: %j',
    async (viewAs) => {
      const { handle, transport } = facadeFixture()
      const response = await handle(
        apiRequestFixture(
          `me?viewAs=${encodeURIComponent(JSON.stringify(viewAs))}`,
        ),
      )
      expect(response.status).toBe(422)
      expect(transport).not.toHaveBeenCalled()
    },
  )
  it.each(['viewAs=not-json', 'viewAs=%7B%7D&viewAs=%7B%7D', 'other=value'])(
    'rejects malformed mode parameters: %s',
    async (query) => {
      const { handle, transport } = facadeFixture()
      expect((await handle(apiRequestFixture(`me?${query}`))).status).toBe(422)
      expect(transport).not.toHaveBeenCalled()
    },
  )
})
