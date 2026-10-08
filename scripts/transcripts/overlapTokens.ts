import { normalizeWord } from './normalizeWord.ts'

export function overlapTokens(text: string): Set<string> {
  const tokens = text.split(/\s+/u).map((part) => normalizeWord(part))
  return new Set(tokens.filter((token) => token !== ''))
}
