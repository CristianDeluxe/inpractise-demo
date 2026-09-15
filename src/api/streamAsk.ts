import type { AskData } from './AskData.ts'
import type { AskRequest } from './AskRequest.ts'
import { askStageSchema } from './askStageSchema.ts'
import type { DataParser } from './DataParser.ts'
import type { ResearchClient } from './ResearchClient.ts'
import type { ResponseEnvelope } from './ResponseEnvelope.ts'
import type { StreamAskOptions } from './StreamAskOptions.ts'
import { streamRequest } from './streamRequest.ts'

/** The same question over an event stream: stages first, the answer last. */
export async function streamAsk<T extends Record<string, unknown>>(
  client: ResearchClient,
  request: AskRequest,
  parseData: DataParser<AskData<T>>,
  options: StreamAskOptions,
): Promise<ResponseEnvelope<AskData<T>, 'ask'>> {
  return streamRequest(
    client,
    request,
    { stageSchema: askStageSchema, parseData },
    options,
  )
}
