import type { BrowserRuntime } from '@/runtime/BrowserRuntime'
import type { ReviewDecision } from '../contracts/ReviewDecision'
import type { DecisionsRow } from './DecisionsRow'
import { unwrapRows } from './unwrapRows'

/** Empty when nobody has recorded a decision for the transcript yet. */
export async function loadReviewDecisions(
  runtime: BrowserRuntime,
  id: string,
): Promise<readonly ReviewDecision[]> {
  const rows = unwrapRows<DecisionsRow[]>(
    await runtime.data
      .from('lab_reviews')
      .select('transcript_id,decisions')
      .eq('transcript_id', id),
  )
  return rows[0]?.decisions ?? []
}
