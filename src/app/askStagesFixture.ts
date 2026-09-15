import type { AskStage } from '@/api/AskStage'

/** The phases a streamed answer reports, in the order the backend yields them. */
export const askStagesFixture: readonly AskStage[] = [
  { phase: 'debited' },
  { phase: 'retrieved', mode: 'hybrid', candidateCount: 10 },
  {
    phase: 'selected',
    selectedCount: 6,
    suppliedCount: 6,
    selectedTokens: 227,
  },
  { phase: 'generating', suppliedCount: 6 },
  { phase: 'verifying', citationCount: 6 },
]
