import type { TranscriptWord } from '../contracts/TranscriptWord'
import type { WordRow } from './WordRow'
import { rowOfOffset } from './rowOfOffset'

/** The words of each row, found by their offset in the space-joined raw text. */
export function groupWordsByRow(
  words: readonly TranscriptWord[],
  breaks: readonly number[],
): WordRow[] {
  const rows: WordRow[] = Array.from({ length: breaks.length + 1 }, () => ({
    words: [],
    firstWord: 0,
  }))
  let offset = 0
  words.forEach((word, index) => {
    const row = rows[rowOfOffset(breaks, offset)]
    if (row) {
      if (row.words.length === 0) row.firstWord = index
      row.words.push(word)
    }
    offset += word.text.length + 1
  })
  return rows
}
