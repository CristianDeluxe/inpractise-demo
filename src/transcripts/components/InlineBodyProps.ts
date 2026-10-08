import type { CorrectedParagraph } from '../contracts/CorrectedParagraph'
import type { ReviewControls } from '../review/ReviewControls'

export type InlineBodyProps = {
  readonly corrected: CorrectedParagraph
  readonly controls: ReviewControls
}
