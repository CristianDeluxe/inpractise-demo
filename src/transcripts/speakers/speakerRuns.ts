import { roleAt } from './roleAt'
import type { SpeakerLabels } from './SpeakerLabels'
import type { SpeakerRun } from './SpeakerRun'
import type { TimedWord } from './TimedWord'

/** Splits a paragraph's words wherever the speaker changes, so each speaker gets a block of their own. */
export function speakerRuns<T extends TimedWord>(
  labels: SpeakerLabels | null,
  words: readonly T[],
): SpeakerRun<T>[] {
  const runs: SpeakerRun<T>[] = []
  for (const word of words) {
    const role = labels === null ? undefined : roleAt(labels.turns, word.start)
    const last = runs.at(-1)
    if (last?.role === role && last !== undefined)
      runs[runs.length - 1] = { role, words: [...last.words, word] }
    else runs.push({ role, words: [word] })
  }
  return runs
}
