import type { AskStage } from '@/api/AskStage'

/** The phases a streamed answer reports, in the order the backend yields them. */
export const askStagesFixture: readonly AskStage[] = [
  { phase: 'debited', elapsedMs: 40 },
  { phase: 'retrieved', mode: 'hybrid', candidateCount: 10, elapsedMs: 380 },
  {
    phase: 'selected',
    selectedCount: 6,
    suppliedCount: 6,
    selectedTokens: 227,
    elapsedMs: 90,
  },
  { phase: 'generating', suppliedCount: 6, elapsedMs: 3200 },
  { phase: 'verifying', citationCount: 6, elapsedMs: 210 },
]
