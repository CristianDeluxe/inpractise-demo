import type { TranscriptParagraph } from '../contracts/TranscriptParagraph'

export function hasLowWord(paragraph: TranscriptParagraph) {
  return paragraph.words.some((word) => word.band === 'low')
}
