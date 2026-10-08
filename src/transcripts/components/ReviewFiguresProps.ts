import type { CorrectionRun } from '../contracts/CorrectionRun'
import type { TranscriptDocument } from '../contracts/TranscriptDocument'

export type ReviewFiguresProps = {
  readonly transcript: TranscriptDocument
  readonly correction: CorrectionRun | null
}
