import type { CorrectedParagraph } from '../contracts/CorrectedParagraph'
import type { TranscriptParagraph } from '../contracts/TranscriptParagraph'
import type { ReviewControls } from '../review/ReviewControls'
import type { ReviewMode } from '../review/ReviewMode'

export type ReviewParagraphProps = {
  readonly paragraph: TranscriptParagraph
  readonly corrected: CorrectedParagraph | undefined
  readonly mode: ReviewMode
  readonly controls: ReviewControls
  readonly active: boolean
  readonly focused: boolean
}
