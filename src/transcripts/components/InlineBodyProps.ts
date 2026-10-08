import type { CorrectedParagraph } from '../contracts/CorrectedParagraph'
import type { TranscriptParagraph } from '../contracts/TranscriptParagraph'
import type { ReviewControls } from '../review/ReviewControls'

export type InlineBodyProps = {
  readonly paragraph: TranscriptParagraph
  readonly corrected: CorrectedParagraph
  readonly controls: ReviewControls
}
