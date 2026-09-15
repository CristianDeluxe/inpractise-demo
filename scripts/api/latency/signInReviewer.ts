import { createClient } from '@supabase/supabase-js'
import type { LatencyTarget } from './LatencyTarget.ts'

/** One password session for the whole run; returns only the access token. */
export async function signInReviewer(target: LatencyTarget): Promise<string> {
  const client = createClient(target.url, target.publishableKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  const result = await client.auth.signInWithPassword({
    email: target.reviewerEmail,
    password: target.reviewerPassword,
  })
  if (result.error) throw new Error('Reviewer sign-in failed')
  return result.data.session.access_token
}
