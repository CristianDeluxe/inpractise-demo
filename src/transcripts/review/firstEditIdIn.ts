import type { CorrectionEdit } from '../contracts/CorrectionEdit'
import type { DecisionMap } from './DecisionMap'

/** The first undecided edit of a paragraph, else its first edit, else null. */
export function firstEditIdIn(
  edits: readonly CorrectionEdit[],
  paragraphId: string,
  decisions: DecisionMap,
) {
  const own = edits.filter((edit) => edit.paragraphId === paragraphId)
  return (own.find((edit) => !decisions.has(edit.id)) ?? own[0])?.id ?? null
}
