import type { CorrectionEdit } from '../contracts/CorrectionEdit'
import type { ReviewControls } from '../review/ReviewControls'

export type FocusedEditCardProps = {
  readonly edit: CorrectionEdit
  readonly start: number | undefined
  readonly controls: ReviewControls
}
