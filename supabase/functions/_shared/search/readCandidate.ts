import type { SupabaseClient } from '@supabase/supabase-js'
import type { BranchRow } from '../types/BranchRow.ts'
import type { Candidate } from '../types/Candidate.ts'
import type { Database } from '../types/Database.ts'
import type { FusedRank } from '../types/FusedRank.ts'
import { candidateKey } from './candidateKey.ts'
import { PassageContentSchema } from './PassageContentSchema.ts'
import { readCandidatePassage } from './readCandidatePassage.ts'

export async function readCandidate(
  client: SupabaseClient<Database>,
  rows: BranchRow[],
  fused: FusedRank,
  premium = true,
): Promise<Candidate> {
  const matching = rows.filter((row) => candidateKey(row) === fused.key)
  const row = matching[0]
  if (!row) throw new Error('Fused rank has no source row')
  const passage = await readCandidatePassage(client, row, premium)
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
