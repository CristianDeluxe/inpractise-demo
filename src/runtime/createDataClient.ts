import { createClient } from '@supabase/supabase-js'
import { fetchKeepingReviewsAlive } from './fetchKeepingReviewsAlive'

/**
 * Database and Storage access under the caller's own JWT. It never holds a
 * session of its own: the token comes from the Auth client on every request,
 * so row-level security sees the signed-in member.
 */
export function createDataClient(
  url: string,
  key: string,
  getToken: () => Promise<string | null>,
  fetchImplementation: typeof fetch = fetchKeepingReviewsAlive,
) {
  return createClient(url, key, {
    accessToken: getToken,
    global: { fetch: fetchImplementation },
  })
}
