import { z } from 'zod'
import type { CorpusDocument } from './CorpusDocument.ts'
import type { PassageImport } from './PassageImport.ts'
import { assertStoredPassage } from './assertStoredPassage.ts'
import { toPassageRow } from './toPassageRow.ts'

export async function ensurePassage(
  context: PassageImport,
  passage: CorpusDocument['passages'][number],
): Promise<void> {
  const { client, document, orgId, indexMode } = context
  const row = toPassageRow(context, passage)
  const stored = await client
    .from('passages')
    .select(
      'text_content,ordinal,section,speaker,speaker_role,token_count,embedding_model,embedding',
    )
    .eq('org_id', orgId)
    .eq('document_id', document.documentId)
    .eq('revision_id', document.revisionId)
    .eq('passage_id', passage.passageId)
    .maybeSingle()
  if (stored.error)
    throw new Error(`Passage lookup failed: ${stored.error.code}`)
  if (stored.data) {
    assertStoredPassage(
      z.record(z.string(), z.unknown()).parse(stored.data),
      passage,
      indexMode,
    )
  } else {
    const inserted = await client.from('passages').insert(row)
    if (inserted.error)
      throw new Error(`Passage insert failed: ${inserted.error.code}`)
  }
}
