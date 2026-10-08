import { fillerWords } from './fillerWords.ts'
import { normalizeWord } from './normalizeWord.ts'

export function isFillerWord(text: string): boolean {
  return fillerWords.has(normalizeWord(text))
}
