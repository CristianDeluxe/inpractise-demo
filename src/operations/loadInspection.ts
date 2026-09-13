import { debug } from '@/api/debug'
import { parseDebugData } from '@/contracts/parseDebugData'
import type { BrowserRuntime } from '@/runtime/BrowserRuntime'

export async function loadInspection(
  runtime: BrowserRuntime,
  _args: undefined,
  signal: AbortSignal,
) {
  return debug(runtime.client, { action: 'debug' }, parseDebugData, { signal })
}
