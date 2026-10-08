import type { ReviewedEdit } from './ReviewedEdit.ts'

/** Accepted edits, plus pending ones when the reviewer opted in. */
export function countedEdits(
  edits: readonly ReviewedEdit[],
  acceptPending: boolean,
): ReviewedEdit[] {
  return edits.filter(
    (edit) =>
      edit.verdict === 'accepted' ||
      (edit.verdict === 'pending' && acceptPending),
  )
}
