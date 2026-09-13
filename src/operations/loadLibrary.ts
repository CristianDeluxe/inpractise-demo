import { list } from '@/api/list'
import { parseListData } from '@/contracts/parseListData'
import type { BrowserRuntime } from '@/runtime/BrowserRuntime'

export async function loadLibrary(
  runtime: BrowserRuntime,
  _args: undefined,
  signal: AbortSignal,
) {
  return list(runtime.client, { action: 'list' }, parseListData, { signal })
}
