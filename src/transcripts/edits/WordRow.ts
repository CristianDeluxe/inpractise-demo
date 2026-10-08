import type { TranscriptWord } from '../contracts/TranscriptWord'

/** The words of one row, with the paragraph index of the first. */
export type WordRow = {
  words: TranscriptWord[]
  firstWord: number
}
