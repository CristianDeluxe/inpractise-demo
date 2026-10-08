import type { TranscriptParagraph } from '@/transcripts/contracts/TranscriptParagraph'
import type { DecisionMap } from '@/transcripts/review/DecisionMap'

/** What a character needs to be scored: its paragraph, where each raw word starts, and the human decisions. */
export type ScoringContext = {
  readonly paragraph: TranscriptParagraph
  readonly offsets: readonly number[]
  readonly decisions: DecisionMap
}
