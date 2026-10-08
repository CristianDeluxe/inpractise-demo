import type { ReactNode } from 'react'
import type { CorrectionRun } from '../contracts/CorrectionRun'
import type { TranscriptDocument } from '../contracts/TranscriptDocument'
import type { ReliabilitySummary } from '../reliability/ReliabilitySummary'

export type TranscriptHeaderProps = {
  readonly transcript: TranscriptDocument
  readonly correction: CorrectionRun | null
  /** Null without a second pass: there is no AI-final text to rate. */
  readonly reliability?: ReliabilitySummary | null
  readonly nav?: ReactNode
}
