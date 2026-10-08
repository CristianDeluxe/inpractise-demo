import type { ReviewDecision } from '../contracts/ReviewDecision'

/** The decisions as they were before one change, and the edits it touched. */
export type DecisionHistoryEntry = {
  readonly records: ReadonlyMap<string, ReviewDecision>
  readonly editIds: readonly string[]
}
