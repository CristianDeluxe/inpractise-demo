import type { ReviewDecision } from '../contracts/ReviewDecision'
import type { ReviewVerdict } from '../contracts/ReviewVerdict'

/** Sets the verdict for every edit id; a null verdict returns the edit to pending. */
export function applyVerdict(
  records: ReadonlyMap<string, ReviewDecision>,
  editIds: readonly string[],
  verdict: ReviewVerdict | null,
  decidedAt: string,
): ReadonlyMap<string, ReviewDecision> {
  const next = new Map(records)
  for (const editId of editIds) {
    if (verdict === null) next.delete(editId)
    else next.set(editId, { editId, verdict, decidedAt })
  }
  return next
}
