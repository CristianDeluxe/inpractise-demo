import { libraryPayloadFixture } from './libraryPayloadFixture'

/** Two public interviews plus a synthetic interview and a filing that must never be listed. */
export function mixedLibraryPayloadFixture() {
  const [base] = libraryPayloadFixture().items
  return {
    items: [
      {
        ...base,
        document_id: 'pod-roche-2024',
        revision_id: 'rev-roche',
        title: 'Roche CEO Thomas Schinecker on In Good Company',
        company: 'roche',
        interview_date: '2024-11-20',
        passage_count: 92,
      },
      {
        ...base,
        document_id: 'pod-novartis-2025',
        revision_id: 'rev-novartis',
        title: 'Novartis CEO Vasant Narasimhan on In Good Company',
        company: 'novartis',
        interview_date: '2025-06-25',
        passage_count: undefined,
      },
      {
        ...base,
        document_id: 'acme-interview',
        title: 'Former buyer on pricing',
        company: 'acme',
        kind: 'synthetic_interview',
        origin: 'synthetic',
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
