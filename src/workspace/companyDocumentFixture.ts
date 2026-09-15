import type { LibraryDocument } from './LibraryDocument'

export function companyDocumentFixture(
  overrides: Partial<LibraryDocument> = {},
): LibraryDocument {
  return {
    document_id: 'doc-1',
    revision_id: 'rev-1',
    title: 'Fixture document',
    company: 'Northstar Workflow',
    kind: 'synthetic_interview',
    origin: 'synthetic',
    interview_date: '2026-03-01',
    published_at: '2026-03-02T00:00:00Z',
    source_url: null,
    ...overrides,
  }
}
