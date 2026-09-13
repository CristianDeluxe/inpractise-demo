import type { CitationSource } from '../../supabase/functions/research/citations/CitationSource.ts'

export function citationSourceFixture(
  overrides: Partial<CitationSource> = {},
): CitationSource {
  return {
    documentId: 's2',
    revisionId: 'rev-1',
    passageId: 'P2',
    text: 'Our small deployment moved in six weeks.',
    title: 'Northstar: a small customer migration',
    company: 'northstar-workflow',
    origin: 'synthetic',
    kind: 'synthetic_interview',
    speaker: 'Elian Corvessa (fictional)',
    speakerRole: 'Small-business customer',
    interviewDate: '2026-08-12',
    publishedAt: '2026-08-14T09:00:00Z',
    sourceUrl: null,
    ...overrides,
  }
}
