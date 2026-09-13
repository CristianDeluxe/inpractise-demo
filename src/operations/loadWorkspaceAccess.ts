import type { BrowserRuntime } from '@/runtime/BrowserRuntime'
import { getSessionToken } from '@/runtime/getSessionToken'
import { loadAccess } from './loadAccess'

export async function loadWorkspaceAccess(
  runtime: BrowserRuntime,
  args: undefined,
  signal: AbortSignal,
) {
  const token = await getSessionToken(runtime.auth)
  signal.throwIfAborted()
  if (!token) return null
  return loadAccess(runtime, args, signal)
}
