import { asrScoreAt } from './asrScoreAt'
import type { ScoredChar } from './ScoredChar'
import type { ScoringContext } from './ScoringContext'
import { visibleChars } from './visibleChars'

/** Characters of raw text starting at `offset`, each scored by its own ASR word and capped. */
export function rawCharScores(
  context: ScoringContext,
  text: string,
  offset: number,
  cap: number,
): ScoredChar[] {
  return visibleChars(text).map(({ at }) =>
    asrScoreAt(context, offset + at, cap),
  )
}
