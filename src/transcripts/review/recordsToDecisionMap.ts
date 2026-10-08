import type { ReviewDecision } from '../contracts/ReviewDecision'
import type { DecisionMap } from './DecisionMap'

export function recordsToDecisionMap(
  records: ReadonlyMap<string, ReviewDecision>,
): DecisionMap {
  return new Map(
    [...records.values()].map((record) => [record.editId, record.verdict]),
  )
}
