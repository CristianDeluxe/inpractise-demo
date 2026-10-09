import type { CorrectedParagraph } from '../contracts/CorrectedParagraph'
import type { TranscriptParagraph } from '../contracts/TranscriptParagraph'

export type ConfidenceBodyProps = {
  readonly paragraph: TranscriptParagraph
  readonly corrected: CorrectedParagraph | undefined
  readonly note: string | null
  readonly active: boolean
  readonly onSeek: (seconds: number) => void
}
