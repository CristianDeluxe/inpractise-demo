import { me } from '@/api/me'
import { parseMeData } from '@/contracts/parseMeData'
import type { BrowserRuntime } from '@/runtime/BrowserRuntime'

export async function loadAccess(
  runtime: BrowserRuntime,
  _args: undefined,
  signal: AbortSignal,
) {
  return me(runtime.client, { action: 'me' }, parseMeData, { signal })
}
