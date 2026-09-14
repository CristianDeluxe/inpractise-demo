import type { SupabaseClient } from '@supabase/supabase-js'
import type { BranchRow } from '../types/BranchRow.ts'
import type { Database } from '../types/Database.ts'

export async function readCandidatePassage(
  client: SupabaseClient<Database>,
  row: BranchRow,
  premium: boolean,
) {
  let query = client
    .from('passages')
    .select(
      'text_content,token_count,document_revisions!inner(documents!inner(required_tier))',
    )
    .eq('org_id', row.org_id)
    .eq('document_id', row.document_id)
    .eq('revision_id', row.revision_id)
    .eq('passage_id', row.passage_id)
  if (!premium)
    query = query.eq('document_revisions.documents.required_tier', 'basic')
  const passage = await query.maybeSingle()
  if (passage.error)
    throw new Error(`Evidence read failed: ${passage.error.code}`)
  if (!passage.data) throw new Error('Evidence access changed during retrieval')
  return passage
}
