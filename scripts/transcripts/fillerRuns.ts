import type { FillerRun } from './FillerRun.ts'
import { isFillerWord } from './isFillerWord.ts'

export function fillerRuns(words: readonly string[]): FillerRun[] {
  const runs: FillerRun[] = []
  words.forEach((word, index) => {
    if (!isFillerWord(word)) return
    const previous = runs.at(-1)
    if (previous !== undefined && previous.last === index - 1)
      runs[runs.length - 1] = { first: previous.first, last: index }
    else runs.push({ first: index, last: index })
  })
  return runs
}
