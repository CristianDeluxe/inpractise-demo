import { read } from '@/api/read'
import type { ReadRequest } from '@/api/ReadRequest'
import { parseReadData } from '@/contracts/parseReadData'
import type { BrowserRuntime } from '@/runtime/BrowserRuntime'

export async function loadPassage(
  runtime: BrowserRuntime,
  args: ReadRequest,
  signal: AbortSignal,
) {
  return read(runtime.client, args, parseReadData, { signal })
}
