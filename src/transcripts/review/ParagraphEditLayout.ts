import type { CorrectionEdit } from '../contracts/CorrectionEdit'
import type { TimeInterval } from './TimeInterval'

/** A paragraph's edits in reading order and the audio each one rewrites. */
export type ParagraphEditLayout = {
  readonly edits: readonly CorrectionEdit[]
  readonly spans: readonly (readonly [string, TimeInterval])[]
}
