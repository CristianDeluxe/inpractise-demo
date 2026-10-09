import { repeatableWords } from './repeatableWords'
import type { ScoredWord } from './ScoredWord'
import { wordKey } from './wordKey'

/**
 * "pretty pretty dramatic" reads as one "pretty": the repeat merges into the
 * word before it, keeping the earlier start and capital, the later trailing
 * punctuation and the lower score. Null when the pair is not a stutter.
 */
export function mergeStutter(
  previous: ScoredWord,
  word: ScoredWord,
): ScoredWord | null {
  const key = wordKey(word.text)
  if (key === '' || key !== wordKey(previous.text)) return null
  if (repeatableWords.has(key) || /\P{L}$/u.test(previous.text)) return null
  return {
    text: previous.text + word.text.slice(previous.text.length),
    score: Math.min(previous.score, word.score),
    start: previous.start,
  }
}
