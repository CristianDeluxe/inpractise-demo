import type { TranscriptWord } from '../contracts/TranscriptWord'

export type ConfidenceWordsProps = {
  readonly words: readonly TranscriptWord[]
  readonly onSeek: (seconds: number) => void
  /** Same length as words; true marks a word to strike through. */
  readonly struck?: readonly boolean[]
  /** Draws the dotted low-confidence underline; default true. */
  readonly showFlags?: boolean
}
