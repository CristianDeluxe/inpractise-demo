import type { CorrectionEdit } from '../contracts/CorrectionEdit'
import type { DecisionMap } from './DecisionMap'

/** Puts `from` back in place of the first occurrence of `to` for every rejected edit. */
export function revertRejectedEdits(
  text: string,
  edits: readonly CorrectionEdit[],
  decisions: DecisionMap,
) {
  return edits.reduce(
    (current, edit) =>
      decisions.get(edit.id) === 'rejected'
        ? current.replace(edit.to, () => edit.from)
        : current,
    text,
  )
}
