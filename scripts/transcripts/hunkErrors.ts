import type { Hunk } from './Hunk.ts'
import { splitWords } from './splitWords.ts'

/** Substitutions plus insertions and deletions of one hunk: min(a, b) + |a - b| = max(a, b). */
export function hunkErrors(hunk: Hunk): number {
  return Math.max(splitWords(hunk.from).length, splitWords(hunk.to).length)
}
