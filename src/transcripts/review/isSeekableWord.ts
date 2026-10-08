import type { TranscriptWord } from '../contracts/TranscriptWord'

/** Words worth a tab stop: low confidence or flagged. The rest stay pointer-only. */
export function isSeekableWord(word: TranscriptWord): boolean {
  return word.band === 'low' || word.flags.length > 0
}
