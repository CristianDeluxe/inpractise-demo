import type { ReviewDecision } from '../contracts/ReviewDecision'

/** Persists the whole decision list of one transcript. */
export type ReviewSaver = (
  id: string,
  decisions: readonly ReviewDecision[],
) => Promise<void>
