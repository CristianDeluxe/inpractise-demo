import { countedEdits } from './countedEdits.ts'
import type { LearnMode } from './LearnMode.ts'
import type { LearnSelection } from './LearnSelection.ts'
import { readReferenceVerdicts } from './readReferenceVerdicts.ts'
import { referenceSelection } from './referenceSelection.ts'
import type { ReviewedEdit } from './ReviewedEdit.ts'

export function learnedEditsFor(
  id: string,
  edits: readonly ReviewedEdit[],
  mode: LearnMode,
): LearnSelection {
  if (mode === 'references')
    return referenceSelection(edits, readReferenceVerdicts(id))
  const counted = countedEdits(edits, mode === 'accept-pending')
  return { glossary: counted, examples: counted, basis: 'human' }
}
