import type { LearnSelection } from './LearnSelection.ts'
import type { ReferenceVerdict } from './ReferenceVerdict.ts'
import type { ReviewedEdit } from './ReviewedEdit.ts'

/**
 * Glossary lessons are content edits the references confirm. A paragraph is
 * an example only when every edit in it is confirmed or style only, so no
 * contested wording becomes a lesson.
 */
export function referenceSelection(
  edits: readonly ReviewedEdit[],
  verdicts: ReadonlyMap<string, ReferenceVerdict>,
): LearnSelection {
  return {
    glossary: edits.filter((edit) => verdicts.get(edit.id) === 'confirmed'),
    examples: edits.filter((edit) => {
      const verdict = verdicts.get(edit.id)
      return verdict === undefined || verdict === 'confirmed'
    }),
    basis: 'references',
  }
}
