import type { CorrectionEdit } from '@/transcripts/contracts/CorrectionEdit'
import { alignEditTokens } from './alignEditTokens'
import { rawCharScores } from './rawCharScores'
import type { ScoredChar } from './ScoredChar'
import type { ScoringContext } from './ScoringContext'
import { tokenize } from './tokenize'

/**
 * The raw words left in place by an edit below the auto-accept threshold. A
 * word the edit would change is capped at 1 - the edit's confidence: the surer
 * the model is that it is wrong, the less it can be trusted. A word the edit
 * would keep keeps its ASR confidence.
 */
export function uncertainCharScores(
  context: ScoringContext,
  edit: CorrectionEdit,
  offset: number,
): ScoredChar[] {
  const from = tokenize(edit.from)
  const changed = new Set(
    alignEditTokens(from, tokenize(edit.to)).flatMap((step) =>
      step.kind === 'removed' && step.leftIndex !== null
        ? [step.leftIndex]
        : [],
    ),
  )
  return from.flatMap((token, index) =>
    rawCharScores(
      context,
      token.text,
      offset + token.at,
      changed.has(index) ? 1 - edit.confidence : 1,
    ),
  )
}
