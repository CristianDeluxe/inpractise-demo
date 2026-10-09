import { endsSentence } from './endsSentence.ts'
import type { FillerRun } from './FillerRun.ts'
import type { FillerSpan } from './FillerSpan.ts'

/** "healthcare, uh." -> "healthcare.": drop the fillers into the previous word, keeping a sentence end. */
export function spanAbsorbingPrevious(
  words: readonly string[],
  run: FillerRun,
): FillerSpan | null {
  const previous = words[run.first - 1]
  if (previous === undefined) return null
  const lastFiller = words[run.last] ?? ''
  const to = endsSentence(lastFiller)
    ? previous.replace(/[,;:]$/, '') + (/[.?!]+$/.exec(lastFiller)?.[0] ?? '')
    : previous
  return { first: run.first - 1, last: run.last, to }
}
