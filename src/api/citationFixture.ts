import type { Citation } from './Citation.ts'

export function citationFixture(overrides: Partial<Citation> = {}): Citation {
  return {
    citationId: 'northstar:rev-1:p-1',
    documentId: 'northstar',
    revisionId: 'rev-1',
    passageId: 'p-1',
    quote: 'Source evidence \u{10400}',
    startChar: 0,
    endChar: 17,
    title: 'Synthetic interview',
    company: 'northstar',
    origin: 'synthetic',
    kind: 'synthetic_interview',
    speaker: 'Invented speaker',
    speakerRole: 'Former operator',
    interviewDate: '2026-09-01',
    publishedAt: '2026-09-02T00:00:00Z',
    sourceUrl: null,
    readerPath: '/read/northstar/rev-1/p-1',
    ...overrides,
  }
}
