import type { CorrectionEdit } from '../contracts/CorrectionEdit'

/** What the keyboard walks and the inspector lists in the current view. */
export type ReviewEditScope = {
  readonly activeEdits: readonly CorrectionEdit[]
  /** Paragraphs that j and k step between. */
  readonly stepIds: readonly string[]
}
