import type { ReviewedEdit } from './ReviewedEdit.ts'

/** Replaces the first occurrence of `from` with `to` for every accepted edit; the rest stays raw. */
export function applyAcceptedEdits(
  text: string,
  edits: readonly ReviewedEdit[],
): string {
  return edits.reduce(
    (current, edit) =>
      edit.verdict === 'accepted'
        ? current.replace(edit.from, () => edit.to)
        : current,
    text,
  )
}
