import type { CorrectedParagraph } from '@/transcripts/contracts/CorrectedParagraph.ts'

export type AssembledParagraph = {
  readonly paragraph: CorrectedParagraph
  readonly dropped: number
  /** Words the model changed without an edit; the paragraph text leaves them out. */
  readonly unreported: number
}
