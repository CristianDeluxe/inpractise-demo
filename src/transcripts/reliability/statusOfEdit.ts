import type { CorrectionEdit } from '@/transcripts/contracts/CorrectionEdit'
import type { DecisionMap } from '@/transcripts/review/DecisionMap'
import { autoAcceptThreshold } from './autoAcceptThreshold'
import type { EditStatus } from './EditStatus'

/** A deferred decision is not a decision: the edit falls back to the model's own confidence. */
export function statusOfEdit(
  edit: CorrectionEdit,
  decisions: DecisionMap,
): EditStatus {
  const verdict = decisions.get(edit.id)
  if (verdict === 'accepted' || verdict === 'rejected') return verdict
  return edit.confidence >= autoAcceptThreshold ? 'auto' : 'uncertain'
}
