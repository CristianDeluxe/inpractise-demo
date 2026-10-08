import type { ScoredWord } from './ScoredWord'

/** Word text and score rounded to two decimals, for compact assertions. */
export function scoreRowsFixture(words: readonly ScoredWord[]) {
  return words.map((word) => [word.text, Number(word.score.toFixed(2))])
}
