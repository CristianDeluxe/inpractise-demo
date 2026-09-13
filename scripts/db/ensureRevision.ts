import type { SupabaseClient } from '@supabase/supabase-js'
import { z } from 'zod'
import type { Database } from '../../supabase/functions/_shared/types/Database.ts'
import { assertStoredRevision } from './assertStoredRevision.ts'
import type { CorpusDocument } from './CorpusDocument.ts'
import type { RevisionRow } from './RevisionRow.ts'

export async function ensureRevision(
  client: SupabaseClient<Database>,
  document: CorpusDocument,
  revision: RevisionRow,
): Promise<void> {
  const orgId = revision.org_id
  const existing = await client
    .from('document_revisions')
    .select('*')
    .eq('org_id', orgId)
    .eq('document_id', document.documentId)
    .eq('revision_id', document.revisionId)
    .maybeSingle()
  if (existing.error)
    throw new Error(`Revision lookup failed: ${existing.error.code}`)
  if (existing.data) {
    assertStoredRevision(
      z.record(z.string(), z.unknown()).parse(existing.data),
      revision,
    )
  } else {
    const inserted = await client.from('document_revisions').insert(revision)
    if (inserted.error)
      throw new Error(`Revision insert failed: ${inserted.error.code}`)
  }
}
