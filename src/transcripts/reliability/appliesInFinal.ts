import type { CorrectionEdit } from '@/transcripts/contracts/CorrectionEdit'
import type { DecisionMap } from '@/transcripts/review/DecisionMap'
import { statusOfEdit } from './statusOfEdit'

/** Whether an edit's wording is part of the final text: accepted by a person or auto-accepted. */
export function appliesInFinal(decisions: DecisionMap) {
  return (edit: CorrectionEdit) => {
    const status = statusOfEdit(edit, decisions)
    return status === 'accepted' || status === 'auto'
  }
}
