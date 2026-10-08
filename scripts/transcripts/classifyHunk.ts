import { hasDigit } from './hasDigit.ts'
import type { Hunk } from './Hunk.ts'
import type { HunkCategory } from './HunkCategory.ts'
import { isFillerWord } from './isFillerWord.ts'
import { matchKey } from './matchKey.ts'
import { splitWords } from './splitWords.ts'

/** Category of a hunk, or null for filler removal and for case or punctuation only changes. */
export function classifyHunk(hunk: Hunk): HunkCategory | null {
  const fromWords = splitWords(hunk.from)
  const toWords = splitWords(hunk.to)
  if (toWords.length === 0 && fromWords.every((word) => isFillerWord(word)))
    return null
  if (fromWords.map(matchKey).join(' ') === toWords.map(matchKey).join(' '))
    return null
  if (hasDigit(hunk.from) || hasDigit(hunk.to)) return 'number'
  if (toWords.length > 0 && toWords.every((word) => /^\p{Lu}/u.test(word)))
    return 'entity'
  return 'term'
}
