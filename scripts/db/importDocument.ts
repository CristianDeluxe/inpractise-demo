import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../../supabase/functions/_shared/types/Database.ts'
import type { CorpusDocument } from './CorpusDocument.ts'
import type { ImportOptions } from './ImportOptions.ts'
import { ensureDocument } from './ensureDocument.ts'
import { ensurePassage } from './ensurePassage.ts'
import { ensureRevision } from './ensureRevision.ts'
import { toRevision } from './toRevision.ts'

export async function importDocument(
  client: SupabaseClient<Database>,
  document: CorpusDocument,
  options: ImportOptions,
): Promise<string> {
  const { orgId, manifest, indexMode } = options
  const revision = toRevision(document, orgId, manifest, indexMode)
  await ensureDocument(client, document, orgId)
  await ensureRevision(client, document, revision)
  for (const passage of document.passages)
    await ensurePassage({ client, document, orgId, indexMode }, passage)
  const published = await client.rpc('publish_document', {
    org_id: orgId,
    document_id: document.documentId,
    revision_id: document.revisionId,
    expected_passages: document.passages.length,
    expected_hash: revision.normalized_sha256,
  })
  if (published.error)
    throw new Error(`Publication failed: ${published.error.code}`)
  return published.data
}
