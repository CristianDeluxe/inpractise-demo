import type { DataParser } from './DataParser.ts'
import type { NoteSaveData } from './NoteSaveData.ts'
import type { NoteSaveRequest } from './NoteSaveRequest.ts'
import type { RequestOptions } from './RequestOptions.ts'
import type { ResearchClient } from './ResearchClient.ts'
import type { ResponseEnvelope } from './ResponseEnvelope.ts'
import { parseActionData } from './parseActionData.ts'
import { researchTransport } from './researchTransport.ts'

export async function noteSave<T extends Record<string, unknown>>(
  client: ResearchClient,
  request: NoteSaveRequest,
  parseData: DataParser<NoteSaveData<T>>,
  options: RequestOptions = {},
): Promise<ResponseEnvelope<NoteSaveData<T>, 'note_save'>> {
  return researchTransport<NoteSaveData<T>, 'note_save'>(
    client,
    request,
    (input) => parseActionData(request, input, parseData),
    options,
  )
}
