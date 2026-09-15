import { createResearchClient } from '@/api/createResearchClient'
import type { BrowserRuntime } from '@/runtime/BrowserRuntime'
import { vi } from 'vitest'
import { z } from 'zod'
import { askStreamFixture } from './askStreamFixture'
import { authClientFixture } from './authClientFixture'
import { sessionFixture } from './sessionFixture'
import { uiPayloadFixture } from './uiPayloadFixture'

export function uiRuntimeFixture() {
  const auth = authClientFixture()
  const getSession = vi.spyOn(auth, 'getSession').mockResolvedValue({
    data: { session: sessionFixture },
    error: null,
  })
  const requests: Record<string, unknown>[] = []
  const fetcher = vi.fn<typeof fetch>(async (_url, init) => {
    const body = typeof init?.body === 'string' ? init.body : '{}'
    const request = z.record(z.string(), z.unknown()).parse(JSON.parse(body))
    requests.push(request)
    if (request['stream'] === true)
      return Promise.resolve(
        askStreamFixture(uiPayloadFixture(String(request['action']))),
      )
    return Promise.resolve(
      new Response(
        JSON.stringify({
          action: request['action'],
          data: uiPayloadFixture(String(request['action'])),
          buildId: 'build-test',
          requestId: 'request-test',
        }),
        { headers: { 'content-type': 'application/json' } },
      ),
    )
  })
  const authChange = vi.spyOn(auth, 'onAuthStateChange').mockReturnValue({
    data: {
      subscription: { id: 'test', callback: () => {}, unsubscribe: () => {} },
    },
  })
  vi.spyOn(auth, 'signInWithPassword').mockResolvedValue({
    data: { user: sessionFixture.user, session: sessionFixture },
    error: null,
  })
  const signOut = vi.spyOn(auth, 'signOut').mockResolvedValue({ error: null })
  const runtime: BrowserRuntime = {
    auth,
    client: createResearchClient({
      baseUrl: 'https://example.supabase.co',
      publishableKey: 'sb_publishable_test',
      getAccessToken: async () => Promise.resolve('test-token'),
      fetch: fetcher,
    }),
    events: new EventTarget(),
    controllers: new Set(),
  }
  return { runtime, requests, fetcher, signOut, authChange, getSession }
}
