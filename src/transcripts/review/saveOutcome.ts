import { saveReview } from '../api/saveReview'
import type { ReviewDecision } from '../contracts/ReviewDecision'
import type { SaveState } from '../hooks/SaveState'

/** Sends the decisions and reports how it went instead of throwing. */
export async function saveOutcome(
  transcriptId: string,
  decisions: readonly ReviewDecision[],
): Promise<SaveState> {
  try {
    await saveReview(transcriptId, decisions)
    return 'saved'
  } catch {
    return 'error'
  }
}
