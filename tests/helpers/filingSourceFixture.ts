import type { CitationSource } from '../../supabase/functions/research/citations/CitationSource.ts'
import { citationSourceFixture } from './citationSourceFixture.ts'

/** A public filing passage about the same company as the interview fixture. */
export function filingSourceFixture(): CitationSource {
  return citationSourceFixture({
    documentId: 'f1',
    revisionId: 'rev-f',
    passageId: 'B1',
    text: 'Deployments for smaller customers were completed within one quarter during fiscal 2025.',
    title: 'Form 10-K, fiscal 2025',
    origin: 'public',
    kind: 'sec_filing',
    speaker: null,
    speakerRole: null,
    interviewDate: null,
    publishedAt: '2025-07-30T00:00:00Z',
    sourceUrl: 'https://www.sec.gov/example',
  })
}
