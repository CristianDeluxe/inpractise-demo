import { applyEdits } from '@/transcripts/edits/applyEdits.ts'
import type { ReviewedEdit } from './ReviewedEdit.ts'

/** Writes every accepted edit at the position the reviewer saw it; the rest stays raw. */
export function applyAcceptedEdits(
  text: string,
  edits: readonly ReviewedEdit[],
): string {
  return applyEdits(text, edits, (edit) => edit.verdict === 'accepted')
}
