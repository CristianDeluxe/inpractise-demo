import { libraryPayloadFixture } from './libraryPayloadFixture'

/** Two interviews at two companies plus one filing that must never be listed. */
export function mixedLibraryPayloadFixture() {
  const [base] = libraryPayloadFixture().items
  return {
    items: [
      {
        ...base,
        document_id: 'northstar-interview',
        title: 'Former operator on migrations',
        company: 'northstar',
        passage_count: 12,
      },
      {
        ...base,
        document_id: 'acme-interview',
        title: 'Former buyer on pricing',
        company: 'acme',
        interview_date: '2026-08-15',
        passage_count: undefined,
      },
      {
        ...base,
        document_id: 'northstar-filing',
        title: 'Northstar annual filing',
        company: 'northstar',
        kind: 'sec_filing',
        origin: 'public',
        interview_date: null,
      },
    ],
  }
}
