import { citationSourceFixture } from '../../../tests/helpers/citationSourceFixture.ts'

/** One stored notebook row for the given document; ids otherwise fixed. */
export function noteRowFixture(documentId: string, noteId: string) {
  const source = citationSourceFixture()
  return {
    note_id: noteId,
    document_id: documentId,
    revision_id: source.revisionId,
    passage_id: source.passageId,
    question: 'What does the source establish?',
    note: 'Worth keeping.',
    created_at: '2026-09-15T10:00:00Z',
  }
}
