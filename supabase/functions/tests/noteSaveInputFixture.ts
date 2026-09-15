import { citationSourceFixture } from '../../../tests/helpers/citationSourceFixture.ts'
import type { NoteSaveInput } from '../research/notes/NoteSaveInput.ts'

export function noteSaveInputFixture(documentId: string): NoteSaveInput {
  const source = citationSourceFixture()
  return {
    documentId,
    revisionId: source.revisionId,
    passageId: source.passageId,
    question: 'What does the source establish?',
    note: 'Worth keeping.',
  }
}
