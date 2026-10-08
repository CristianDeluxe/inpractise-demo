import type { CorrectionEdit } from '../contracts/CorrectionEdit'
import type { EditSegment } from '../edits/EditSegment'
import type { ReviewControls } from '../review/ReviewControls'
import type { MarkVariant } from './MarkVariant'

export type TrackedTextProps = {
  readonly segments: readonly EditSegment<CorrectionEdit>[]
  readonly variant: MarkVariant
  readonly controls: ReviewControls
}
