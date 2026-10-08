import type { CorrectionEdit } from '@/transcripts/contracts/CorrectionEdit'
import { appliedCharScores } from './appliedCharScores'
import { confirmedCharScores } from './confirmedCharScores'
import type { ScoredChar } from './ScoredChar'
import type { ScoringContext } from './ScoringContext'
import { statusOfEdit } from './statusOfEdit'
import { uncertainCharScores } from './uncertainCharScores'

/**
 * Accepted and auto-applied edits score their new wording. A rejected edit
 * leaves the raw words, which a person confirmed (1). An uncertain edit leaves
 * the raw words, scored by uncertainCharScores.
 */
export function editCharScores(
  context: ScoringContext,
  edit: CorrectionEdit,
  offset: number,
): ScoredChar[] {
  const status = statusOfEdit(edit, context.decisions)
  if (status === 'rejected')
    return confirmedCharScores(context, edit.from, offset)
  if (status === 'uncertain') return uncertainCharScores(context, edit, offset)
  return appliedCharScores(context, edit, status === 'accepted', offset)
}
