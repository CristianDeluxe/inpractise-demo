import type { ScoredChar } from './ScoredChar'
import type { ScoringContext } from './ScoringContext'
import { rawWordIndexAt } from './rawWordIndexAt'
import { visibleChars } from './visibleChars'

/** Raw characters a person looked at and kept: fully reliable. */
export function confirmedCharScores(
  context: ScoringContext,
  text: string,
  offset: number,
): ScoredChar[] {
  return visibleChars(text).map(({ at }) => ({
    score: 1,
    wordIndex: rawWordIndexAt(context.offsets, offset + at),
  }))
}
