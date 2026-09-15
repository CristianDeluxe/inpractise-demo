import { streamAsk } from '@/api/streamAsk'
import { parseAskData } from '@/contracts/parseAskData'
import type { BrowserRuntime } from '@/runtime/BrowserRuntime'
import type { StreamingAskArgs } from './StreamingAskArgs'

export async function submitQuestion(
  runtime: BrowserRuntime,
  args: StreamingAskArgs,
  signal: AbortSignal,
) {
  return streamAsk(runtime.client, args.request, parseAskData, {
    signal,
    onStage: args.onStage,
  })
}
