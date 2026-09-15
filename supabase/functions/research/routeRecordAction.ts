import { handleDebug } from './actions/handleDebug.ts'
import { handleNoteDelete } from './actions/handleNoteDelete.ts'
import { handleNoteList } from './actions/handleNoteList.ts'
import { handleNoteSave } from './actions/handleNoteSave.ts'
import { handleProvenance } from './actions/handleProvenance.ts'
import type { Principal } from './Principal.ts'
import type { RecordRequest } from './RecordRequest.ts'

/**
 * Dispatch for the caller's own records: the request ledger and the notebook.
 * Receives the effective principal already computed by routeAction, so a
 * viewing restriction applies here exactly as it does to evidence.
 */
export async function routeRecordAction(
  principal: Principal,
  request: RecordRequest,
): Promise<unknown> {
  switch (request.action) {
    case 'debug':
      return await handleDebug(principal)
    case 'provenance':
      return await handleProvenance(principal, request.requestId)
    case 'note_save':
      return await handleNoteSave(principal, {
        documentId: request.documentId,
        revisionId: request.revisionId,
        passageId: request.passageId,
        question: request.question,
        note: request.note,
      })
    case 'note_list':
      return await handleNoteList(principal)
    case 'note_delete':
      return await handleNoteDelete(principal, request.noteId)
  }
}
