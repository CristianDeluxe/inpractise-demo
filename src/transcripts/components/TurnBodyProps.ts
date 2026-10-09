import type { CorrectedParagraph } from '../contracts/CorrectedParagraph'
import type { TranscriptParagraph } from '../contracts/TranscriptParagraph'
import type { ReviewControls } from '../review/ReviewControls'

/** What a non-final view needs to lay a paragraph out as speaker turns. */
export type TurnBodyProps = {
  readonly paragraph: TranscriptParagraph
  readonly corrected: CorrectedParagraph
  readonly controls: ReviewControls
  readonly note: string | null
  readonly active: boolean
}
