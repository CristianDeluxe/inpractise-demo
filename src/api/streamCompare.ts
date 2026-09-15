import type { CompareData } from './CompareData.ts'
import type { CompareRequest } from './CompareRequest.ts'
import { compareStageSchema } from './compareStageSchema.ts'
import type { DataParser } from './DataParser.ts'
import type { ResearchClient } from './ResearchClient.ts'
import type { ResponseEnvelope } from './ResponseEnvelope.ts'
import type { StreamCompareOptions } from './StreamCompareOptions.ts'
import { streamRequest } from './streamRequest.ts'

/** A cross-reference over an event stream: stages first, the verdict last. */
export async function streamCompare<T extends Record<string, unknown>>(
  client: ResearchClient,
  request: CompareRequest,
  parseData: DataParser<CompareData<T>>,
  options: StreamCompareOptions,
): Promise<ResponseEnvelope<CompareData<T>, 'compare'>> {
  return streamRequest(
    client,
    request,
    { stageSchema: compareStageSchema, parseData },
    options,
  )
}
