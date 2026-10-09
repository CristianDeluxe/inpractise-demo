import { capitalizeFirst } from './capitalizeFirst.ts'
import type { FillerRun } from './FillerRun.ts'
import type { FillerSpan } from './FillerSpan.ts'
import { isFillerWord } from './isFillerWord.ts'

/** "Uh so" -> "So": drop the fillers and keep the next word, capitalised when the filler opened a sentence. */
export function spanAbsorbingNext(
  words: readonly string[],
  run: FillerRun,
): FillerSpan | null {
  const next = words[run.last + 1]
  if (next === undefined || isFillerWord(next)) return null
  const opensSentence = /^[A-Z]/.test(words[run.first] ?? '')
  return {
    first: run.first,
    last: run.last + 1,
    to: opensSentence ? capitalizeFirst(next) : next,
  }
}
