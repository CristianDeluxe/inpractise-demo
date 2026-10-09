import type { ReactNode } from 'react'
import type { TranscriptDocument } from '../contracts/TranscriptDocument'
import type { ReliabilitySummary } from '../reliability/ReliabilitySummary'
import type { ReviewMode } from '../review/ReviewMode'

export type ReliabilityRailProps = {
  readonly transcript: TranscriptDocument
  /** Null without a second pass: there is no AI-final text to rate. */
  readonly reliability: ReliabilitySummary | null
  readonly mode: ReviewMode
  readonly onOpenReport: () => void
  /** The edit inspector, when the rail is wide enough to hold it. */
  readonly inspector?: ReactNode
}
