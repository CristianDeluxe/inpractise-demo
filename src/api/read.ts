import type { DataParser } from './DataParser.ts'
import type { ReadData } from './ReadData.ts'
import type { ReadRequest } from './ReadRequest.ts'
import type { RequestOptions } from './RequestOptions.ts'
import type { ResearchClient } from './ResearchClient.ts'
import type { ResponseEnvelope } from './ResponseEnvelope.ts'
import { parseActionData } from './parseActionData.ts'
import { researchTransport } from './researchTransport.ts'

export async function read<T extends Record<string, unknown>>(
  client: ResearchClient,
  request: ReadRequest,
  parseData: DataParser<ReadData<T>>,
  options: RequestOptions = {},
): Promise<ResponseEnvelope<ReadData<T>, 'read'>> {
  return researchTransport<ReadData<T>, 'read'>(
    client,
    request,
    (input) => parseActionData(request, input, parseData),
    options,
  )
}
