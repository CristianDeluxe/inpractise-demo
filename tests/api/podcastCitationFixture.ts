import type { Citation } from '@/api/Citation.ts'
import { citationFixture } from '@/api/citationFixture.ts'

/** The Roche interview passage the offline examples cite; a fixture, not a live revision. */
export function podcastCitationFixture(
  overrides: Partial<Citation> = {},
): Citation {
  return citationFixture({
    citationId: 'pod-roche-2024:rev-1:T018.1',
    documentId: 'pod-roche-2024',
    revisionId: 'rev-1',
    passageId: 'T018.1',
    quote: 'we invest about 13 billion Swiss francs',
    startChar: 0,
    endChar: 39,
    title: 'Roche CEO Thomas Schinecker on In Good Company',
    company: 'roche',
    origin: 'public',
    kind: 'public_interview',
    speaker: 'Thomas Schinecker',
    speakerRole: 'Chief Executive Officer, Roche',
    interviewDate: '2024-11-20',
    publishedAt: '2024-11-20T00:00:00Z',
    sourceUrl: 'https://www.youtube.com/watch?v=LQ6lAvNMjPE',
    readerPath: '/read/pod-roche-2024/rev-1/T018.1',
    ...overrides,
  })
}
