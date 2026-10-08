import type { CorrectionEdit } from '../contracts/CorrectionEdit'
import type { DecisionMap } from './DecisionMap'

/** What the review text shows: accepted and pending edits, rejected ones reverted. */
export function isNotRejected(decisions: DecisionMap) {
  return (edit: CorrectionEdit) => decisions.get(edit.id) !== 'rejected'
}
