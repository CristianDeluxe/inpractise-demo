import type { CorrectionRun } from '../contracts/CorrectionRun'
import type { TranscriptDocument } from '../contracts/TranscriptDocument'
import type { DecisionMap } from '../review/DecisionMap'

export type ReportMetricsProps = {
  readonly transcript: TranscriptDocument
  readonly correction: CorrectionRun | null
  readonly decisions: DecisionMap
}
