import type { CorrectionEdit } from '@/transcripts/contracts/CorrectionEdit.ts'
import type { CorrectionEditDraft } from './CorrectionEditDraft.ts'

/** Stable ids: <paragraphId>-e<n>, numbered in the order given (memory first). */
export function numberEdits(
  paragraphId: string,
  drafts: readonly CorrectionEditDraft[],
): CorrectionEdit[] {
  return drafts.map((draft, index) => ({
    ...draft,
    id: `${paragraphId}-e${String(index + 1)}`,
  }))
}
