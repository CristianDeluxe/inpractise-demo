import type { TranscriptDocument } from '../contracts/TranscriptDocument'
import type { ReliabilitySummary } from '../reliability/ReliabilitySummary'

export type ReviewFactsProps = {
  readonly transcript: TranscriptDocument
  /** Null without a second pass: there are no edits to count. */
  readonly reliability: ReliabilitySummary | null
}
