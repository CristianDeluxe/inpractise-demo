import type { ReviewSaver } from '../api/ReviewSaver'
import type { ReviewDecision } from '../contracts/ReviewDecision'
import type { SaveState } from '../hooks/SaveState'

/** Sends the decisions and reports how it went instead of throwing. */
export async function saveOutcome(
  onSave: ReviewSaver,
  transcriptId: string,
  decisions: readonly ReviewDecision[],
): Promise<SaveState> {
  try {
    await onSave(transcriptId, decisions)
    return 'saved'
  } catch {
    return 'error'
  }
}
