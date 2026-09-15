import { citationFixture } from '@/api/citationFixture'

/** A minimal, grounded investigation result: one sub-question, one citation,
 * shaped exactly like what the server's `investigate` action returns. */
export function investigationFixture() {
  const citation = citationFixture()
  return {
    status: 'answered' as const,
    claims: [{ text: 'Claim', citationIds: [citation.citationId] }],
    citations: [citation],
    missingEvidence: [],
    mode: 'hybrid' as const,
    candidateCount: 4,
    question: 'What does the corpus establish about northstar?',
    subQuestions: [
      {
        index: 1,
        question: 'What did northstar say about pricing?',
        status: 'answered' as const,
        mode: 'hybrid' as const,
        candidateCount: 4,
        selectedCount: 2,
        suppliedCount: 2,
        citationIds: [citation.citationId],
      },
    ],
    refinement: 'none' as const,
    elapsedMs: 1200,
  }
}
