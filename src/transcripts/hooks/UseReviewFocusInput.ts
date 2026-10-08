import type { CorrectionEdit } from '../contracts/CorrectionEdit'
import type { DecisionMap } from '../review/DecisionMap'

export type UseReviewFocusInput = {
  readonly flaggedIds: readonly string[]
  readonly edits: readonly CorrectionEdit[]
  readonly decisions: DecisionMap
}
