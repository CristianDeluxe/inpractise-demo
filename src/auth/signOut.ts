import type { BrowserRuntime } from '@/runtime/BrowserRuntime'
import { cancelRequests } from '@/runtime/cancelRequests'

export async function signOut(runtime: BrowserRuntime) {
  cancelRequests(runtime)
  runtime.events.dispatchEvent(new Event('invalid-session'))
  const { error } = await runtime.auth.signOut({ scope: 'local' })
  if (error) throw new Error('Sign-out failed. Please retry.')
}
