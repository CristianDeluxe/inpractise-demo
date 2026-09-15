import { ApiError } from '../../_shared/http/ApiError.ts'
import type { NoteSaveInput } from '../notes/NoteSaveInput.ts'
import { readPassageRow } from '../passages/readPassageRow.ts'
import type { Principal } from '../Principal.ts'

/**
 * Two gates, both as the caller. The Edge read applies the effective viewing
 * mode, so a reviewer viewing as a basic member cannot save a premium passage;
 * the insert policy then re-checks passage visibility under the caller's real
 * token, so nothing this code does can save what the database would not show.
 * Identity is never sent: user_id defaults to auth.uid() inside the database.
 */
export async function handleNoteSave(
  principal: Principal,
  input: NoteSaveInput,
) {
  await readPassageRow(principal, input)
  const result = await principal.client
    .from('research_notes')
    .insert({
      org_id: principal.orgId,
      document_id: input.documentId,
      revision_id: input.revisionId,
      passage_id: input.passageId,
      question: input.question ?? null,
      note: input.note ?? null,
    })
    .select('note_id,created_at')
    .single()
  if (result.error?.code === '42501')
    throw new ApiError('forbidden', 'The database refused this note')
  if (result.error)
    throw new ApiError('dependency_failure', 'Note save failed', true)
  return { noteId: result.data.note_id, createdAt: result.data.created_at }
}
