import type { CorrectionEdit } from '../contracts/CorrectionEdit'
import type { ReviewControls } from '../review/ReviewControls'
import type { MarkVariant } from './MarkVariant'

export type EditMarkProps = {
  readonly edit: CorrectionEdit
  readonly variant: MarkVariant
  readonly controls: ReviewControls
}
