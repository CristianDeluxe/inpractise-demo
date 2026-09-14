import type { BrowserRuntime } from '@/runtime/BrowserRuntime'
import { cancelRequests } from '@/runtime/cancelRequests'

/**
 * Hide the workspace and abort outstanding reads before awaiting local sign-out.
 * Even if session removal fails, previously loaded evidence must not remain
 * visible while the user believes they are leaving the account.
 */
export async function signOut(runtime: BrowserRuntime) {
  cancelRequests(runtime)
  runtime.events.dispatchEvent(new Event('invalid-session'))
  const { error } = await runtime.auth.signOut({ scope: 'local' })
  if (error) throw new Error('Sign-out failed. Please retry.')
}
