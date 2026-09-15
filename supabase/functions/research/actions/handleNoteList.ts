import { ApiError } from '../../_shared/http/ApiError.ts'
import { readNoteCitation } from '../notes/readNoteCitation.ts'
import type { Principal } from '../Principal.ts'

/**
 * The caller's own notes, newest first. Row level security scopes the table to
 * the authenticated principal, so no user filter is sent: a query that returned
 * another member's notes would be a policy failure, not a missing predicate.
 * Each citation is re-read as the effective principal at list time.
 */
export async function handleNoteList(principal: Principal) {
  const result = await principal.client
    .from('research_notes')
    .select(
      'note_id,document_id,revision_id,passage_id,question,note,created_at',
    )
    .order('created_at', { ascending: false })
    .limit(200)
  if (result.error)
    throw new ApiError('dependency_failure', 'Notebook read failed', true)
  const notes = []
  for (const row of result.data) {
    const ref = {
      documentId: row.document_id,
      revisionId: row.revision_id,
      passageId: row.passage_id,
    }
    notes.push({
      noteId: row.note_id,
      ...ref,
      question: row.question,
      note: row.note,
      createdAt: row.created_at,
      citation: await readNoteCitation(principal, ref),
    })
  }
  return { notes }
}
