import type { CorrectedParagraph } from '../contracts/CorrectedParagraph'
import type { CorrectionEdit } from '../contracts/CorrectionEdit'

export type ReviewDerived = {
  readonly correctedById: ReadonlyMap<string, CorrectedParagraph>
  readonly edits: readonly CorrectionEdit[]
  readonly flaggedIds: readonly string[]
}
