import type { TranscriptWord } from '../contracts/TranscriptWord'

export type ConfidenceWordsProps = {
  readonly words: readonly TranscriptWord[]
  readonly onSeek: (seconds: number) => void
  /** Same length as words; true marks a word to strike through. */
  readonly struck?: readonly boolean[]
}
