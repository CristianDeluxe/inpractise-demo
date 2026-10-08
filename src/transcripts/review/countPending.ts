import type { CorrectionEdit } from '../contracts/CorrectionEdit'
import type { DecisionMap } from './DecisionMap'

export function countPending(
  edits: readonly CorrectionEdit[],
  decisions: DecisionMap,
) {
  return edits.filter((edit) => !decisions.has(edit.id)).length
}
