import type { MemoryExample } from '@/transcripts/contracts/MemoryExample.ts'
import { jaccard } from './jaccard.ts'
import { overlapTokens } from './overlapTokens.ts'

/** Top examples by token-overlap Jaccard against the query text; zero overlap is excluded. */
export function retrieveExamples(
  query: string,
  examples: readonly MemoryExample[],
  limit: number,
): MemoryExample[] {
  const queryTokens = overlapTokens(query)
  return examples
    .map((example) => ({
      example,
      score: jaccard(queryTokens, overlapTokens(example.raw)),
    }))
    .filter((scored) => scored.score > 0)
    .toSorted((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((scored) => scored.example)
}
