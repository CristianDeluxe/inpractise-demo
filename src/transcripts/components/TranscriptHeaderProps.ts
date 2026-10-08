import type { ReactNode } from 'react'
import type { CorrectionRun } from '../contracts/CorrectionRun'
import type { TranscriptDocument } from '../contracts/TranscriptDocument'

export type TranscriptHeaderProps = {
  readonly transcript: TranscriptDocument
  readonly correction: CorrectionRun | null
  readonly nav?: ReactNode
}
