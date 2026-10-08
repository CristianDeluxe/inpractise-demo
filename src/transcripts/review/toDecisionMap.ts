import type { ReviewDecision } from '../contracts/ReviewDecision'
import type { DecisionMap } from './DecisionMap'

export function toDecisionMap(
  decisions: readonly ReviewDecision[],
): DecisionMap {
  return new Map(
    decisions.map((decision) => [decision.editId, decision.verdict]),
  )
}
