import type { MergedWord } from './MergedWord.ts'
import type { RawToken } from './RawToken.ts'

/** A token whose text starts with a space begins a new word; so does the first token. */
export function mergeTokens(tokens: readonly RawToken[]): MergedWord[] {
  const words: MergedWord[] = []
  for (const token of tokens) {
    const previous = words.at(-1)
    const piece = token.text.trimStart()
    if (piece === '') continue
    if (previous === undefined || token.text.startsWith(' ')) {
      words.push({
        text: piece,
        start: token.start,
        end: token.end,
        confidence: token.confidence,
        sentenceStart: previous === undefined,
      })
    } else {
      words[words.length - 1] = {
        text: previous.text + piece,
        start: previous.start,
        end: token.end,
        confidence: Math.min(previous.confidence, token.confidence),
        sentenceStart: previous.sentenceStart,
      }
    }
  }
  return words
}
