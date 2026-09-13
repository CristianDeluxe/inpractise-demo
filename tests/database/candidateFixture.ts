import type { Candidate } from '../../supabase/functions/_shared/types/Candidate.ts'

export function candidateFixture(
  index: number,
  overrides: Partial<Candidate> = {},
): Candidate {
  return {
    key: `passage-${String(index)}`,
    orgId: 'org-a',
    documentId: `document-${String(index)}`,
    revisionId: 'revision',
    passageId: `passage-${String(index)}`,
    text: 'Synthetic test evidence.',
    tokenCount: 100,
    lexicalRank: index + 1,
    vectorRank: null,
    lexicalScore: 1,
    cosineDistance: null,
    fusionScore: 1,
    ...overrides,
  }
}
