import { streamCompare } from '@/api/streamCompare'
import { parseCompareData } from '@/contracts/parseCompareData'
import type { BrowserRuntime } from '@/runtime/BrowserRuntime'
import type { StreamingCompareArgs } from './StreamingCompareArgs'

export async function submitComparison(
  runtime: BrowserRuntime,
  args: StreamingCompareArgs,
  signal: AbortSignal,
) {
  return streamCompare(runtime.client, args.request, parseCompareData, {
    signal,
    onStage: args.onStage,
  })
}
