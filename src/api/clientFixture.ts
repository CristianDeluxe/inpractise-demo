import type { AccessTokenAccessor } from './AccessTokenAccessor.ts'
import { createResearchClient } from './createResearchClient.ts'
import type { ResearchClient } from './ResearchClient.ts'

export function clientFixture(
  fetch: typeof globalThis.fetch,
  getAccessToken: AccessTokenAccessor = () => 'test-session',
): ResearchClient {
  return createResearchClient({
    baseUrl: 'https://example.supabase.co',
    publishableKey: 'test-publishable-key',
    getAccessToken,
    fetch,
  })
}
