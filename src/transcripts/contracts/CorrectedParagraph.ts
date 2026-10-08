import type { CorrectionEdit } from './CorrectionEdit'

/** The corrector's full text for one paragraph plus the edits that produced it. */
export type CorrectedParagraph = {
  readonly paragraphId: string
  readonly text: string
  readonly edits: readonly CorrectionEdit[]
}
