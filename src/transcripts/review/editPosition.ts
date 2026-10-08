import type { CorrectionEdit } from '../contracts/CorrectionEdit'

/** One-based place of an edit in reading order, or 0 when it is not in the list. */
export function editPosition(
  edits: readonly CorrectionEdit[],
  editId: string,
): number {
  return edits.findIndex((edit) => edit.id === editId) + 1
}
