import type { SupabaseClient } from '@supabase/supabase-js'
import type { Candidate } from '../types/Candidate.ts'
import type { Database } from '../types/Database.ts'
import type { SearchInput } from '../types/SearchInput.ts'
import { BranchRowSchema } from './BranchRowSchema.ts'
import { candidateKey } from './candidateKey.ts'
import { fuseRanks } from './fuseRanks.ts'
import { readCandidate } from './readCandidate.ts'
import { selectContext } from './selectors/selectContext.ts'

export async function retrieveCandidates(
  client: SupabaseClient<Database>,
  input: SearchInput,
) {
  const result = await client.rpc(
    input.premium === false ? 'search_candidates_scoped' : 'search_candidates',
    {
      query_text: input.query,
      ...(input.embedding
        ? { query_embedding: JSON.stringify(input.embedding) }
        : {}),
      ...(input.company === undefined ? {} : { company_filter: input.company }),
      candidate_limit: 30,
    },
  )
  if (result.error)
    throw new Error(`Candidate retrieval failed: ${result.error.code}`)
  const rows = BranchRowSchema.array().parse(result.data)
  const ranked = fuseRanks(
    ['fts', 'vector'].map((branch) =>
      rows
        .filter((row) => row.branch === branch)
        .map((row) => ({ key: candidateKey(row), rank: row.rank })),
    ),
  ).slice(0, 40)
  const candidates: Candidate[] = []
  for (const fused of ranked)
    candidates.push(await readCandidate(client, rows, fused, input.premium))
  const selected = selectContext(candidates)
  return {
    candidates,
    diagnostics: {
      mode: input.embedding ? 'hybrid' : 'lexical_only',
      candidateAt10: candidates.slice(0, 10).map((item) => item.key),
      selectedIds: selected.map((item) => item.key),
      selectedTokens: selected.reduce(
        (total, item) => total + item.tokenCount,
        0,
      ),
      diagnosis: 'unclassified' as const,
    },
  }
}
