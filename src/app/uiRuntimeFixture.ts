import { createResearchClient } from '@/api/createResearchClient'
import type { BrowserRuntime } from '@/runtime/BrowserRuntime'
import { createDataClient } from '@/runtime/createDataClient'
import { labFetchFixture } from '@/transcripts/fixtures/labFetchFixture'
import { vi } from 'vitest'
import { authClientFixture } from './authClientFixture'
import { sessionFixture } from './sessionFixture'
import { uiFetcherFixture } from './uiFetcherFixture'

/** `lab` answers the database and Storage requests of the transcript lab. */
export function uiRuntimeFixture(
  lab: typeof fetch = labFetchFixture().fetcher,
) {
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
    data: createDataClient(
      'https://example.supabase.co',
      'sb_publishable_test',
      async () => Promise.resolve('test-token'),
      lab,
    ),
    events: new EventTarget(),
    controllers: new Set(),
  }
  return { runtime, requests, fetcher, signOut, authChange, getSession }
}
