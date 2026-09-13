import { ask } from '@/api/ask'
import type { AskRequest } from '@/api/AskRequest'
import { parseAskData } from '@/contracts/parseAskData'
import type { BrowserRuntime } from '@/runtime/BrowserRuntime'

export async function submitQuestion(
  runtime: BrowserRuntime,
  args: AskRequest,
  signal: AbortSignal,
) {
  return ask(runtime.client, args, parseAskData, { signal })
}
