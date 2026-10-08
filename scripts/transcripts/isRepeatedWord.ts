import { normalizeWord } from './normalizeWord.ts'

export function isRepeatedWord(
  text: string,
  previous: string | undefined,
): boolean {
  if (previous === undefined) return false
  const normalized = normalizeWord(text)
  return normalized !== '' && normalized === normalizeWord(previous)
}
