import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../supabase/functions/_shared/types/Database.ts'
import type { AskResult } from './AskResult.ts'

/**
 * Re-reads every cited passage as the persona. A citation the reader's own
 * client cannot fetch is evidence the answer should never have carried.
 */
export async function assertCitationsAuthorised(
  client: SupabaseClient<Database>,
  result: AskResult,
): Promise<boolean> {
  for (const citation of result.citations) {
    const [documentId, revisionId, passageId] = citation.citationId.split(':')
    const row = await client
      .from('passages')
      .select('passage_id')
      .eq('document_id', documentId ?? '')
      .eq('revision_id', revisionId ?? '')
      .eq('passage_id', passageId ?? '')
      .maybeSingle()
    if (row.error || !row.data) return false
  }
  return true
}
