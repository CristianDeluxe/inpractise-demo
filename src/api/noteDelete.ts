import type { DataParser } from './DataParser.ts'
import type { NoteDeleteData } from './NoteDeleteData.ts'
import type { NoteDeleteRequest } from './NoteDeleteRequest.ts'
import type { RequestOptions } from './RequestOptions.ts'
import type { ResearchClient } from './ResearchClient.ts'
import type { ResponseEnvelope } from './ResponseEnvelope.ts'
import { parseActionData } from './parseActionData.ts'
import { researchTransport } from './researchTransport.ts'

export async function noteDelete<T extends Record<string, unknown>>(
  client: ResearchClient,
  request: NoteDeleteRequest,
  parseData: DataParser<NoteDeleteData<T>>,
  options: RequestOptions = {},
): Promise<ResponseEnvelope<NoteDeleteData<T>, 'note_delete'>> {
  return researchTransport<NoteDeleteData<T>, 'note_delete'>(
    client,
    request,
    (input) => parseActionData(request, input, parseData),
    options,
  )
}
