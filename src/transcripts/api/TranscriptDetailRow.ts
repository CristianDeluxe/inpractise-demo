import type { CorrectionRun } from '../contracts/CorrectionRun'
import type { TranscriptDocument } from '../contracts/TranscriptDocument'
import type { WaveformPeaks } from '../contracts/WaveformPeaks'

/** The heavy columns of one lab_transcripts row. */
export type TranscriptDetailRow = {
  readonly transcript: TranscriptDocument
  readonly correction: CorrectionRun | null
  readonly peaks: WaveformPeaks | null
  readonly audio_object: string | null
}
