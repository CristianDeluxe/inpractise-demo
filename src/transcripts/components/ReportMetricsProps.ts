import type { CorrectionRun } from '../contracts/CorrectionRun'
import type { TranscriptDocument } from '../contracts/TranscriptDocument'
import type { ReliabilitySummary } from '../reliability/ReliabilitySummary'

export type ReportMetricsProps = {
  readonly transcript: TranscriptDocument
  readonly correction: CorrectionRun | null
  readonly summary: ReliabilitySummary
}
