import type { CorrectionEdit } from '../contracts/CorrectionEdit'
import { applyEdits } from '../edits/applyEdits'
import type { DecisionMap } from './DecisionMap'
import { isNotRejected } from './isNotRejected'

/** The raw paragraph with every edit not rejected written at its placed position. */
export function reviewedParagraphText(
  raw: string,
  edits: readonly CorrectionEdit[],
  decisions: DecisionMap,
): string {
  return applyEdits(raw, edits, isNotRejected(decisions))
}
