import type { ReviewDecision } from '../contracts/ReviewDecision'

export function toDecisionRecords(
  decisions: readonly ReviewDecision[],
): ReadonlyMap<string, ReviewDecision> {
  return new Map(decisions.map((decision) => [decision.editId, decision]))
}
