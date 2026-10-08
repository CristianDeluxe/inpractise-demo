import type { CorrectionEdit } from '@/transcripts/contracts/CorrectionEdit'
import { alignEditTokens } from './alignEditTokens'
import { asrScoreAt } from './asrScoreAt'
import { rawWordIndexAt } from './rawWordIndexAt'
import type { ScoredChar } from './ScoredChar'
import type { ScoringContext } from './ScoringContext'
import { tokenize } from './tokenize'
import { visibleChars } from './visibleChars'

/**
 * The wording an applied edit wrote. A word the edit really changed or added
 * takes the model's confidence (1 once a person accepted the edit); a word the
 * edit only re-cased or re-punctuated is still the heard word and keeps its
 * ASR confidence, unless a person accepted the edit.
 */
export function appliedCharScores(
  context: ScoringContext,
  edit: CorrectionEdit,
  accepted: boolean,
  offset: number,
): ScoredChar[] {
  const from = tokenize(edit.from)
  const score = accepted ? 1 : edit.confidence
  return alignEditTokens(from, tokenize(edit.to)).flatMap((step) => {
    if (step.kind === 'removed') return []
    const source = step.leftIndex === null ? undefined : from[step.leftIndex]
    const position = offset + (source?.at ?? 0)
    if (step.kind === 'equal' && !accepted)
      return visibleChars(step.text).map(() => asrScoreAt(context, position, 1))
    const wordIndex = rawWordIndexAt(context.offsets, position)
    return visibleChars(step.text).map(() => ({ score, wordIndex }))
  })
}
