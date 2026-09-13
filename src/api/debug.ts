import type { DataParser } from './DataParser.ts'
import type { DebugData } from './DebugData.ts'
import type { DebugRequest } from './DebugRequest.ts'
import type { RequestOptions } from './RequestOptions.ts'
import type { ResearchClient } from './ResearchClient.ts'
import type { ResponseEnvelope } from './ResponseEnvelope.ts'
import { parseActionData } from './parseActionData.ts'
import { researchTransport } from './researchTransport.ts'

export async function debug<T extends Record<string, unknown>>(
  client: ResearchClient,
  request: DebugRequest,
  parseData: DataParser<DebugData<T>>,
  options: RequestOptions = {},
): Promise<ResponseEnvelope<DebugData<T>, 'debug'>> {
  return researchTransport<DebugData<T>, 'debug'>(
    client,
    request,
    (input) => parseActionData(request, input, parseData),
    options,
  )
}
