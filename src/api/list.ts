import type { DataParser } from './DataParser.ts'
import type { ListData } from './ListData.ts'
import type { ListRequest } from './ListRequest.ts'
import type { RequestOptions } from './RequestOptions.ts'
import type { ResearchClient } from './ResearchClient.ts'
import type { ResponseEnvelope } from './ResponseEnvelope.ts'
import { parseActionData } from './parseActionData.ts'
import { researchTransport } from './researchTransport.ts'

export async function list<T extends Record<string, unknown>>(
  client: ResearchClient,
  request: ListRequest,
  parseData: DataParser<ListData<T>>,
  options: RequestOptions = {},
): Promise<ResponseEnvelope<ListData<T>, 'list'>> {
  return researchTransport<ListData<T>, 'list'>(
    client,
    request,
    (input) => parseActionData(request, input, parseData),
    options,
  )
}
