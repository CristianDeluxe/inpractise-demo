import type { CorrectionEdit } from '../contracts/CorrectionEdit'
import type { ReviewControls } from '../review/ReviewControls'

export type ParagraphEditRowProps = {
  readonly edit: CorrectionEdit
  readonly controls: ReviewControls
}
