import type { CorrectionEdit } from '../contracts/CorrectionEdit'
import type { ReviewControls } from '../review/ReviewControls'

export type EditCardProps = {
  readonly edit: CorrectionEdit
  readonly controls: ReviewControls
}
