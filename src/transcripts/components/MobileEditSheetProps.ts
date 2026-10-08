import type { CorrectionEdit } from '../contracts/CorrectionEdit'
import type { ReviewControls } from '../review/ReviewControls'

export type MobileEditSheetProps = {
  readonly edit: CorrectionEdit | undefined
  readonly controls: ReviewControls
}
