import type { SupabaseClient } from '@supabase/supabase-js'
import type { BranchRow } from '../types/BranchRow.ts'
import type { Candidate } from '../types/Candidate.ts'
import type { Database } from '../types/Database.ts'
import type { FusedRank } from '../types/FusedRank.ts'
import { candidateKey } from './candidateKey.ts'
import { PassageContentSchema } from './PassageContentSchema.ts'

export async function readCandidate(
  client: SupabaseClient<Database>,
  rows: BranchRow[],
  fused: FusedRank,
): Promise<Candidate> {
  const matching = rows.filter((row) => candidateKey(row) === fused.key)
  const row = matching[0]
  if (!row) throw new Error('Fused rank has no source row')
  const passage = await client
    .from('passages')
    .select('text_content,token_count')
    .eq('org_id', row.org_id)
    .eq('document_id', row.document_id)
    .eq('revision_id', row.revision_id)
    .eq('passage_id', row.passage_id)
    .maybeSingle()
  if (passage.error)
    throw new Error(`Evidence read failed: ${passage.error.code}`)
  if (!passage.data) throw new Error('Evidence access changed during retrieval')
  const content = PassageContentSchema.parse(passage.data)
  const lexical = matching.find((item) => item.branch === 'fts')
  const vector = matching.find((item) => item.branch === 'vector')
  return {
    ...fused,
    orgId: row.org_id,
    documentId: row.document_id,
    revisionId: row.revision_id,
    passageId: row.passage_id,
    text: content.text_content,
    tokenCount: content.token_count,
    lexicalRank: lexical ? lexical.rank : null,
    vectorRank: vector ? vector.rank : null,
    lexicalScore: lexical?.lexical_score ?? null,
    cosineDistance: vector?.cosine_distance ?? null,
  }
}
