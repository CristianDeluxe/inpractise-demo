import type { CorrectedParagraph } from '@/transcripts/contracts/CorrectedParagraph.ts'

export type AssembledParagraph = {
  readonly paragraph: CorrectedParagraph
  readonly dropped: number
}
