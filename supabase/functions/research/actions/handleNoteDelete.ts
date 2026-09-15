import { ApiError } from '../../_shared/http/ApiError.ts'
import type { Principal } from '../Principal.ts'

/**
 * Deletes one of the caller's own notes. The delete policy hides every other
 * member's rows, so another caller's note and an unknown id are the same 404.
 */
export async function handleNoteDelete(principal: Principal, noteId: string) {
  const result = await principal.client
    .from('research_notes')
    .delete()
    .eq('note_id', noteId)
    .select('note_id')
    .maybeSingle()
  if (result.error)
    throw new ApiError('dependency_failure', 'Note delete failed', true)
  if (!result.data) throw new ApiError('not_found', 'No such note')
  return { noteId: result.data.note_id }
}
