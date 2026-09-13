import { ApiError } from '@/api/ApiError'
import { loadAccess } from '@/operations/loadAccess'
import type { BrowserRuntime } from '@/runtime/BrowserRuntime'
import type { Credentials } from './Credentials'

export async function passwordLogin(
  runtime: BrowserRuntime,
  credentials: Credentials,
  signal: AbortSignal,
) {
  const { error } = await runtime.auth.signInWithPassword(credentials)
  if (error)
    throw new Error('Sign-in failed. Check your provisioned demo credentials.')
  if (signal.aborted) throw new ApiError('cancelled', 'Sign-in cancelled.')
  return loadAccess(runtime, undefined, signal)
}
