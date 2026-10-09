import { fillerWords } from './fillerWords'
import { wordKey } from './wordKey'

export function isFiller(text: string) {
  return fillerWords.has(wordKey(text))
}
