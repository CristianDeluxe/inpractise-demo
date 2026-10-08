import type { BrowserRuntime } from '@/runtime/BrowserRuntime'
import type { ReviewDecision } from '../contracts/ReviewDecision'

/**
 * Replaces the decisions of one transcript. The database accepts the write
 * only from an active reviewer of the organisation and stamps the author and
 * time itself.
 */
export async function saveReview(
  runtime: BrowserRuntime,
  orgId: string,
  id: string,
  decisions: readonly ReviewDecision[],
): Promise<void> {
  const { error } = await runtime.data
    .from('lab_reviews')
    .upsert(
      { org_id: orgId, transcript_id: id, decisions },
      { onConflict: 'org_id,transcript_id' },
    )
  if (error) throw new Error(error.message)
}
