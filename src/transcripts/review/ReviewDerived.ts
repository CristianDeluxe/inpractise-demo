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
  /** The edits the model was not sure enough of, in reading order: the optional spot-check. */
  readonly spotCheckEdits: readonly CorrectionEdit[]
  /** Paragraphs holding at least one of them, in reading order. */
  readonly spotCheckIds: readonly string[]
}
