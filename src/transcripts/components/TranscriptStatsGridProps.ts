import type { CorrectionRun } from '../contracts/CorrectionRun'
import type { TranscriptDocument } from '../contracts/TranscriptDocument'

export type TranscriptStatsGridProps = {
  readonly transcript: TranscriptDocument
  readonly correction: CorrectionRun | null
}
