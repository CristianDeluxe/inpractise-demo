import type { ModelEdit } from '../../scripts/transcripts/ModelEdit.ts'

export function proposedEditFixture(
  from: string,
  to = 'x',
  confidence = 0.9,
): ModelEdit {
  return { from, to, category: 'term', reason: 'because', confidence }
}
