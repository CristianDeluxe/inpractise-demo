import { stripEdgePunctuation } from './stripEdgePunctuation.ts'

export function normalizeWord(word: string): string {
  return stripEdgePunctuation(word).toLowerCase()
}
