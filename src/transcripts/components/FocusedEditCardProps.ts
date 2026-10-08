import type { CorrectionEdit } from '../contracts/CorrectionEdit'
import type { ReviewControls } from '../review/ReviewControls'
import type { TimeInterval } from '../review/TimeInterval'

export type FocusedEditCardProps = {
  readonly edit: CorrectionEdit
  readonly edits: readonly CorrectionEdit[]
  readonly span: TimeInterval | undefined
  /** The edit is shown because the pointer rests on it, not because it was selected. */
  readonly previewing: boolean
  readonly controls: ReviewControls
}
