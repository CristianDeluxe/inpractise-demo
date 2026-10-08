import type { CorrectedParagraph } from '@/transcripts/contracts/CorrectedParagraph.ts'
import type { CorrectionUsage } from '@/transcripts/contracts/CorrectionUsage.ts'

export type ChunkOutcome = {
  readonly paragraphs: readonly CorrectedParagraph[]
  readonly usage: CorrectionUsage
  readonly dropped: number
  readonly examplesUsed: number
  readonly memoryHits: number
}
