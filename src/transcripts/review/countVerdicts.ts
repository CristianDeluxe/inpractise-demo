import type { CorrectionEdit } from '../contracts/CorrectionEdit'
import type { DecisionMap } from './DecisionMap'
import type { VerdictCounts } from './VerdictCounts'

export function countVerdicts(
  edits: readonly CorrectionEdit[],
  decisions: DecisionMap,
): VerdictCounts {
  let accepted = 0
  let rejected = 0
  for (const edit of edits) {
    const verdict = decisions.get(edit.id)
    if (verdict === 'accepted') accepted += 1
    if (verdict === 'rejected') rejected += 1
  }
  return {
    accepted,
    rejected,
    pending: edits.length - accepted - rejected,
    total: edits.length,
  }
}
