import type { Citation } from '@/api/Citation'
import { citationFixture } from '@/api/citationFixture'

/** A public filing citation about the same company as the interview fixture. */
export function filingCitationFixture(): Citation {
  const quote = 'Deployments were completed within one quarter.'
  return citationFixture({
    citationId: 'northstar-10k:rev-f:B1',
    documentId: 'northstar-10k',
    revisionId: 'rev-f',
    passageId: 'B1',
    quote,
    endChar: Array.from(quote).length,
    title: 'Form 10-K, fiscal 2025',
    origin: 'public',
    kind: 'sec_filing',
    speaker: null,
    speakerRole: null,
    interviewDate: null,
    publishedAt: '2025-07-30T00:00:00Z',
    sourceUrl: 'https://www.sec.gov/example',
    readerPath: '/read/northstar-10k/rev-f/B1',
  })
}
