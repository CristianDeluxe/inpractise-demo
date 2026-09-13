import type { DataParser } from './DataParser.ts'
import type { MeData } from './MeData.ts'
import type { MeRequest } from './MeRequest.ts'
import type { RequestOptions } from './RequestOptions.ts'
import type { ResearchClient } from './ResearchClient.ts'
import type { ResponseEnvelope } from './ResponseEnvelope.ts'
import { parseActionData } from './parseActionData.ts'
import { researchTransport } from './researchTransport.ts'

export async function me<T extends Record<string, unknown>>(
  client: ResearchClient,
  request: MeRequest,
  parseData: DataParser<MeData<T>>,
  options: RequestOptions = {},
): Promise<ResponseEnvelope<MeData<T>, 'me'>> {
  return researchTransport<MeData<T>, 'me'>(
    client,
    request,
    (input) => parseActionData(request, input, parseData),
    options,
  )
}
