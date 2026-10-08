import type { ReviewDecision } from '@/transcripts/contracts/ReviewDecision.ts'

export function reviewDecisionFixture(
  editId: string,
  verdict: 'accepted' | 'rejected',
  decidedAt = '2026-01-01T00:00:00.000Z',
): ReviewDecision {
  return { editId, verdict, decidedAt }
}
