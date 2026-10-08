import type { CorrectionEdit } from '../contracts/CorrectionEdit'
import type { DecisionMap } from './DecisionMap'

/** The first undecided edit after `afterId` in document order, wrapping to the start. */
export function nextPendingEditId(
  edits: readonly CorrectionEdit[],
  decisions: DecisionMap,
  afterId: string | null,
) {
  const start =
    afterId === null ? 0 : edits.findIndex((edit) => edit.id === afterId) + 1
  const ordered = [...edits.slice(start), ...edits.slice(0, start)]
  return ordered.find((edit) => !decisions.has(edit.id))?.id ?? null
}
