import type { CorrectionEdit } from '../contracts/CorrectionEdit'

/** A slice of corrected text: plain, or the replacement written by one edit. */
export type TextSegment = {
  readonly text: string
  readonly edit: CorrectionEdit | null
}
