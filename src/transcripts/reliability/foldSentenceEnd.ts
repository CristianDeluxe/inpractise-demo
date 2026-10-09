import type { ScoredWord } from './ScoredWord'

/** "healthcare, uh." keeps its full stop on the word before the dropped filler. */
export function foldSentenceEnd(
  previous: ScoredWord,
  filler: string,
): ScoredWord {
  const end = /[.?!]+$/u.exec(filler)?.[0]
  if (end === undefined) return previous
  return { ...previous, text: previous.text.replace(/[,;:]$/u, '') + end }
}
