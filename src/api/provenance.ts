import type { DataParser } from './DataParser.ts'
import type { ProvenanceData } from './ProvenanceData.ts'
import type { ProvenanceRequest } from './ProvenanceRequest.ts'
import type { RequestOptions } from './RequestOptions.ts'
import type { ResearchClient } from './ResearchClient.ts'
import type { ResponseEnvelope } from './ResponseEnvelope.ts'
import { parseActionData } from './parseActionData.ts'
import { researchTransport } from './researchTransport.ts'

export async function provenance<T extends Record<string, unknown>>(
  client: ResearchClient,
  request: ProvenanceRequest,
  parseData: DataParser<ProvenanceData<T>>,
  options: RequestOptions = {},
): Promise<ResponseEnvelope<ProvenanceData<T>, 'provenance'>> {
  return researchTransport<ProvenanceData<T>, 'provenance'>(
    client,
    request,
    (input) => parseActionData(request, input, parseData),
    options,
  )
}
