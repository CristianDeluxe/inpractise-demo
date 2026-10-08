import type { CorrectionEdit } from '@/transcripts/contracts/CorrectionEdit'
import { reliableWordThreshold } from './reliableWordThreshold'

/** An edit the model is not sure enough about for its wording to count as reliable. */
export function isSpotCheckEdit(edit: CorrectionEdit): boolean {
  return edit.confidence < reliableWordThreshold
}
