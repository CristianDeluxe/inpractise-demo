import type { CorrectionEdit } from '../contracts/CorrectionEdit'
import type { DecisionMap } from './DecisionMap'
import type { VerdictCounts } from './VerdictCounts'

export function countVerdicts(
  edits: readonly CorrectionEdit[],
  decisions: DecisionMap,
): VerdictCounts {
  const counts = { accepted: 0, rejected: 0, deferred: 0 }
  for (const edit of edits) {
    const verdict = decisions.get(edit.id)
    if (verdict !== undefined) counts[verdict] += 1
  }
  return {
    ...counts,
    pending: edits.length - counts.accepted - counts.rejected - counts.deferred,
    total: edits.length,
  }
}
