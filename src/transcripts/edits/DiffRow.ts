import type { CorrectionEdit } from '../contracts/CorrectionEdit'
import type { TranscriptWord } from '../contracts/TranscriptWord'
import type { EditSegment } from './EditSegment'

/** One sentence of a paragraph: its raw words and the segments that rewrite them. */
export type DiffRow = {
  readonly segments: readonly EditSegment<CorrectionEdit>[]
  readonly words: readonly TranscriptWord[]
  /** Index of the first of `words` within the paragraph. */
  readonly firstWord: number
}
