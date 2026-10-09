import type { ScoredWord } from '../reliability/ScoredWord'
import { roleAt } from './roleAt'
import type { SpeakerLabels } from './SpeakerLabels'

/** The new speaker's name when the word at index starts another turn than the word before it. */
export function speakerChangeName(
  labels: SpeakerLabels | null,
  words: readonly ScoredWord[],
  index: number,
): string | null {
  const previous = words[index - 1]
  const word = words[index]
  if (labels === null || previous === undefined || word === undefined)
    return null
  const role = roleAt(labels.turns, word.start)
  if (role === undefined || role === roleAt(labels.turns, previous.start))
    return null
  return labels.names[role]
}
