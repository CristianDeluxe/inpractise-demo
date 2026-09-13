import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../supabase/functions/_shared/types/Database.ts'

/**
 * Expands `documentId:passageId` into the immutable candidate key by reading
 * the caller's current revision, so a republished corpus does not silently
 * turn every case into a retrieval miss.
 */
export async function resolveGoldIds(
  client: SupabaseClient<Database>,
  goldIds: readonly string[],
): Promise<string[]> {
  if (!goldIds.length) return []
  const documents = [...new Set(goldIds.map((id) => id.split(':')[0]))]
  const result = await client
    .from('document_revisions')
    .select('document_id,revision_id')
    .in('document_id', documents as string[])
    .eq('is_current', true)
  if (result.error) throw new Error('Gold revision lookup failed')
  const current = new Map(
    result.data.map((row) => [row.document_id, row.revision_id]),
  )
  return goldIds.flatMap((id) => {
    const [documentId = '', passageId = ''] = id.split(':')
    const revisionId = current.get(documentId)
    return revisionId === undefined
      ? []
      : [`${documentId}:${revisionId}:${passageId}`]
  })
}
