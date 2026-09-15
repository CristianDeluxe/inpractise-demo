import { citationFixture } from '@/api/citationFixture'

/** Two notes: one whose evidence re-read, one whose evidence did not. */
export function notebookPayloadFixture() {
  const citation = citationFixture()
  return {
    notes: [
      {
        noteId: '00000000-0000-4000-8000-000000000001',
        documentId: citation.documentId,
        revisionId: citation.revisionId,
        passageId: citation.passageId,
        question: 'What makes complex Northstar installations hard to replace?',
        note: 'Switching cost argument.',
        createdAt: '2026-09-15T10:00:00Z',
        citation,
      },
      {
        noteId: '00000000-0000-4000-8000-000000000002',
        documentId: 'premium-document',
        revisionId: 'rev-9',
        passageId: 'p-9',
        question: null,
        note: 'Saved with full access.',
        createdAt: '2026-09-14T10:00:00Z',
        citation: null,
      },
    ],
  }
}
