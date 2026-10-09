import type { CorrectionRun } from '../contracts/CorrectionRun'
import type { TranscriptDocument } from '../contracts/TranscriptDocument'

export type TranscriptNoteProps = {
  readonly transcript: TranscriptDocument
  readonly correction: CorrectionRun | null
}
