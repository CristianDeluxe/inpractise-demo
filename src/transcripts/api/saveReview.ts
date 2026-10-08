import type { ReviewDecision } from '../contracts/ReviewDecision'
import { fetchLabJson } from './fetchLabJson'

export async function saveReview(
  id: string,
  decisions: readonly ReviewDecision[],
) {
  await fetchLabJson(`/transcripts/${encodeURIComponent(id)}/review`, {
    method: 'PUT',
    // Lets the last save finish when the reviewer closes or reloads the tab.
    keepalive: true,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(decisions),
  })
}
