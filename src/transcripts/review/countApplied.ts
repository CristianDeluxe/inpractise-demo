import type { CorrectionEdit } from '../contracts/CorrectionEdit'
import type { DecisionMap } from './DecisionMap'

/** Edits that end up in the report: everything not rejected. */
export function countApplied(
  edits: readonly CorrectionEdit[],
  decisions: DecisionMap,
) {
  return edits.filter((edit) => decisions.get(edit.id) !== 'rejected').length
}
