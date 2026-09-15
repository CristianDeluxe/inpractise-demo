import { createResearchClient } from '@/api/createResearchClient'
import type { BrowserRuntime } from '@/runtime/BrowserRuntime'
import { vi } from 'vitest'
import { authClientFixture } from './authClientFixture'
import { sessionFixture } from './sessionFixture'
import { uiFetcherFixture } from './uiFetcherFixture'

export function uiRuntimeFixture() {
  const auth = authClientFixture()
  const getSession = vi.spyOn(auth, 'getSession').mockResolvedValue({
    data: { session: sessionFixture },
    error: null,
  })
  const requests: Record<string, unknown>[] = []
  const fetcher = uiFetcherFixture(requests)
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
