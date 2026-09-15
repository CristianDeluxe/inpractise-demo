import type { DataParser } from './DataParser.ts'
import type { NoteListData } from './NoteListData.ts'
import type { NoteListRequest } from './NoteListRequest.ts'
import type { RequestOptions } from './RequestOptions.ts'
import type { ResearchClient } from './ResearchClient.ts'
import type { ResponseEnvelope } from './ResponseEnvelope.ts'
import { parseActionData } from './parseActionData.ts'
import { researchTransport } from './researchTransport.ts'

export async function noteList<T extends Record<string, unknown>>(
  client: ResearchClient,
  request: NoteListRequest,
  parseData: DataParser<NoteListData<T>>,
  options: RequestOptions = {},
): Promise<ResponseEnvelope<NoteListData<T>, 'note_list'>> {
  return researchTransport<NoteListData<T>, 'note_list'>(
    client,
    request,
    (input) => parseActionData(request, input, parseData),
    options,
  )
}
