import type { CorrectionEdit } from '../contracts/CorrectionEdit'
import type { TranscriptWord } from '../contracts/TranscriptWord'
import type { EditSegment } from '../edits/EditSegment'
import type { ReviewControls } from '../review/ReviewControls'
import type { MarkVariant } from './MarkVariant'

export type TrackedTextProps = {
  readonly segments: readonly EditSegment<CorrectionEdit>[]
  /** The raw words the segments cover, so unedited words can replay the audio. */
  readonly words: readonly TranscriptWord[]
  readonly variant: MarkVariant
  readonly controls: ReviewControls
}
