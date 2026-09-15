import type { CompareStage } from '@/api/CompareStage'

/** The phases a streamed cross-reference reports, in the order the backend yields them. */
export const compareStagesFixture: readonly CompareStage[] = [
  { phase: 'debited' },
  {
    phase: 'retrieved',
    mode: 'hybrid',
    interviewCandidates: 12,
    filingCandidates: 8,
  },
  {
    phase: 'selected',
    interviewCount: 3,
    filingCount: 2,
    selectedTokens: 340,
  },
  { phase: 'generating', suppliedCount: 5 },
  { phase: 'verifying', citationCount: 2 },
]
