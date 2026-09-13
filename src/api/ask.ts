import type { AskData } from './AskData.ts'
import type { AskRequest } from './AskRequest.ts'
import type { DataParser } from './DataParser.ts'
import type { RequestOptions } from './RequestOptions.ts'
import type { ResearchClient } from './ResearchClient.ts'
import type { ResponseEnvelope } from './ResponseEnvelope.ts'
import { parseActionData } from './parseActionData.ts'
import { researchTransport } from './researchTransport.ts'

export async function ask<T extends Record<string, unknown>>(
  client: ResearchClient,
  request: AskRequest,
  parseData: DataParser<AskData<T>>,
  options: RequestOptions = {},
): Promise<ResponseEnvelope<AskData<T>, 'ask'>> {
  return researchTransport<AskData<T>, 'ask'>(
    client,
    request,
    (input) => parseActionData(request, input, parseData),
    options,
  )
}
