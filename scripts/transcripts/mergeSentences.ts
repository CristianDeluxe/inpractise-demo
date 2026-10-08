import type { MergedWord } from './MergedWord.ts'
import { mergeTokens } from './mergeTokens.ts'
import type { RawSentence } from './RawSentence.ts'

export function mergeSentences(
  sentences: readonly RawSentence[],
): MergedWord[] {
  return sentences.flatMap((sentence) => mergeTokens(sentence.tokens))
}
