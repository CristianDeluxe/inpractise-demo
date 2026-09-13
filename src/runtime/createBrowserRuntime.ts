import { createResearchClient } from '@/api/createResearchClient'
import { createClient } from '@supabase/supabase-js'
import type { BrowserRuntime } from './BrowserRuntime'
import { getSessionToken } from './getSessionToken'
import { publicConfig } from './publicConfig'
import { readPublicEnvironment } from './readPublicEnvironment'

export function createBrowserRuntime(): BrowserRuntime | null {
  const config = publicConfig.safeParse(readPublicEnvironment())
  if (!config.success) return null
  const { url, key } = config.data
  const { auth } = createClient(url, key)
  return {
    auth,
    client: createResearchClient({
      baseUrl: url,
      publishableKey: key,
      getAccessToken: async () => getSessionToken(auth),
    }),
    events: new EventTarget(),
    controllers: new Set(),
  }
}
