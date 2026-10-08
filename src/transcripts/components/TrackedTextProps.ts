import type { ReviewControls } from '../review/ReviewControls'
import type { TextSegment } from '../review/TextSegment'
import type { MarkVariant } from './MarkVariant'

export type TrackedTextProps = {
  readonly segments: readonly TextSegment[]
  readonly variant: MarkVariant
  readonly controls: ReviewControls
}
