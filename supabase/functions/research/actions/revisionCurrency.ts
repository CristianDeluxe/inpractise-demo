import { ApiError } from '../../_shared/http/ApiError.ts'
import type { Principal } from '../Principal.ts'

/**
 * A memo written from an answer is read months later. What matters then is not
 * only which revisions were quoted but whether they are still the current ones.
 * A revision the caller can no longer read is reported as not current with no
 * document, which is the truthful answer without disclosing anything.
 */
export async function revisionCurrency(
  principal: Principal,
  revisionIds: readonly string[],
) {
  if (!revisionIds.length) return []
  const result = await principal.client
    .from('document_revisions')
    .select('document_id,revision_id,is_current')
    .in('revision_id', [...revisionIds])
  if (result.error)
    throw new ApiError('dependency_failure', 'Revision lookup failed', true)
  const rows = new Map(
    result.data.map(
      (row: {
        document_id: string
        revision_id: string
        is_current: boolean
      }) => [row.revision_id, row],
    ),
  )
  return revisionIds.map((revisionId) => {
    const row = rows.get(revisionId)
    return {
      revisionId,
      documentId: row?.document_id ?? null,
      current: row?.is_current ?? false,
    }
  })
}
