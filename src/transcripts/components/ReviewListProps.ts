import type { CorrectedParagraph } from '../contracts/CorrectedParagraph'
import type { TranscriptParagraph } from '../contracts/TranscriptParagraph'
import type { ReviewControls } from '../review/ReviewControls'
import type { ReviewMode } from '../review/ReviewMode'

export type ReviewListProps = {
  readonly paragraphs: readonly TranscriptParagraph[]
  readonly correctedById: ReadonlyMap<string, CorrectedParagraph>
  readonly mode: ReviewMode
  readonly controls: ReviewControls
  readonly activeId: string | null
  readonly focusedParagraphId: string | null
}
