import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../../supabase/functions/_shared/types/Database.ts'
import type { CorpusDocument } from './CorpusDocument.ts'

export async function ensureDocument(
  client: SupabaseClient<Database>,
  document: CorpusDocument,
  orgId: string,
): Promise<void> {
  const parent = await client
    .from('documents')
    .select('required_tier')
    .eq('org_id', orgId)
    .eq('document_id', document.documentId)
    .maybeSingle()
  if (parent.error)
    throw new Error(`Document lookup failed: ${parent.error.code}`)
  if (parent.data && parent.data.required_tier !== document.requiredTier)
    throw new Error('Existing document tier mismatch')
  if (!parent.data) {
    const inserted = await client.from('documents').insert({
      org_id: orgId,
      document_id: document.documentId,
      required_tier: document.requiredTier,
    })
    if (inserted.error)
      throw new Error(`Document insert failed: ${inserted.error.code}`)
  }
}
