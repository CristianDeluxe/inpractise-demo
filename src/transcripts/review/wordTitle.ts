import type { TranscriptWord } from '../contracts/TranscriptWord'

/** Hover text: the reason a word is tinted, so colour is never the only signal. */
export function wordTitle(word: TranscriptWord) {
  const confidence = `${String(Math.round(word.confidence * 100))}% confidence, ${word.band}`
  return word.flags.length > 0
    ? `${confidence}. Flags: ${word.flags.join(', ')}`
    : confidence
}
