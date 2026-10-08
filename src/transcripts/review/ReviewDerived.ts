import type { CorrectedParagraph } from '../contracts/CorrectedParagraph'
import type { CorrectionEdit } from '../contracts/CorrectionEdit'
import type { TimeInterval } from './TimeInterval'

export type ReviewDerived = {
  readonly correctedById: ReadonlyMap<string, CorrectedParagraph>
  /** Every edit in reading order. */
  readonly edits: readonly CorrectionEdit[]
  /** Audio each placed edit rewrites, for replaying it. */
  readonly spanById: ReadonlyMap<string, TimeInterval>
  readonly flaggedIds: readonly string[]
}
