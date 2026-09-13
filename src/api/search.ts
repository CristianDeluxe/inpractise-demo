import type { DataParser } from './DataParser.ts'
import type { RequestOptions } from './RequestOptions.ts'
import type { ResearchClient } from './ResearchClient.ts'
import type { ResponseEnvelope } from './ResponseEnvelope.ts'
import type { SearchData } from './SearchData.ts'
import type { SearchRequest } from './SearchRequest.ts'
import { parseActionData } from './parseActionData.ts'
import { researchTransport } from './researchTransport.ts'

export async function search<T extends Record<string, unknown>>(
  client: ResearchClient,
  request: SearchRequest,
  parseData: DataParser<SearchData<T>>,
  options: RequestOptions = {},
): Promise<ResponseEnvelope<SearchData<T>, 'search'>> {
  return researchTransport<SearchData<T>, 'search'>(
    client,
    request,
    (input) => parseActionData(request, input, parseData),
    options,
  )
}
