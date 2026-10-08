import type { CorrectionEdit } from '../contracts/CorrectionEdit'
import type { DecisionMap } from '../review/DecisionMap'

export type ReviewProgressProps = {
  readonly edits: readonly CorrectionEdit[]
  readonly decisions: DecisionMap
}
