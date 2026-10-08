import type { CorrectionEdit } from '../contracts/CorrectionEdit'
import { countVerdicts } from './countVerdicts'
import type { DecisionMap } from './DecisionMap'

/** Edits still pending or flagged for later: the wording the report cannot vouch for. */
export function countUnaccepted(
  edits: readonly CorrectionEdit[],
  decisions: DecisionMap,
) {
  const counts = countVerdicts(edits, decisions)
  return counts.pending + counts.deferred
}
