import { streamInvestigate } from '@/api/streamInvestigate'
import { parseInvestigateData } from '@/contracts/parseInvestigateData'
import type { BrowserRuntime } from '@/runtime/BrowserRuntime'
import type { StreamingInvestigateArgs } from './StreamingInvestigateArgs'

export async function submitInvestigation(
  runtime: BrowserRuntime,
  args: StreamingInvestigateArgs,
  signal: AbortSignal,
) {
  return streamInvestigate(runtime.client, args.request, parseInvestigateData, {
    signal,
    onStage: args.onStage,
  })
}
