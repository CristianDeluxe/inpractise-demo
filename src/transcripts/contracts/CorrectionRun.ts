import type { CorrectedParagraph } from './CorrectedParagraph'
import type { CorrectionMemoryUse } from './CorrectionMemoryUse'
import type { CorrectionProvider } from './CorrectionProvider'
import type { CorrectionUsage } from './CorrectionUsage'

/** Second-pass correction: work/transcripts/<id>/correction.json */
export type CorrectionRun = {
  readonly id: string
  readonly transcriptId: string
  readonly provider: CorrectionProvider
  readonly model: string
  readonly startedAt: string
  readonly durationMs: number
  readonly usage: CorrectionUsage
  readonly memory: CorrectionMemoryUse
  readonly paragraphs: readonly CorrectedParagraph[]
}
