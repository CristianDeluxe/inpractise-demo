import type { CorrectionEdit } from '../contracts/CorrectionEdit'
import type { DecisionMap } from './DecisionMap'

/** Paragraphs holding at least one edit flagged for later. */
export function deferredParagraphIds(
  edits: readonly CorrectionEdit[],
  decisions: DecisionMap,
): ReadonlySet<string> {
  return new Set(
    edits
      .filter((edit) => decisions.get(edit.id) === 'deferred')
      .map((edit) => edit.paragraphId),
  )
}
