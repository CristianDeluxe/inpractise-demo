import type { TranscriptDocument } from '../contracts/TranscriptDocument'
import type { ReliabilitySummary } from '../reliability/ReliabilitySummary'

export type QualitySectionProps = {
  readonly transcript: TranscriptDocument
  /** Null without a second pass: there is no AI-final text to rate. */
  readonly reliability: ReliabilitySummary | null
}
