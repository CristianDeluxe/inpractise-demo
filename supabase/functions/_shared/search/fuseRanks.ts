import type { FusedRank } from '../types/FusedRank.ts'
import type { RankEntry } from '../types/RankEntry.ts'

export function fuseRanks(
  branches: readonly (readonly RankEntry[])[],
): FusedRank[] {
  const scores = new Map<string, number>()
  for (const branch of branches) {
    const seen = new Set<string>()
    for (const entry of branch) {
      if (
        !Number.isInteger(entry.rank) ||
        entry.rank < 1 ||
        seen.has(entry.key)
      )
        throw new Error('Invalid branch ranking')
      seen.add(entry.key)
      scores.set(
        entry.key,
        (scores.get(entry.key) ?? 0) + 1 / (60 + entry.rank),
      )
    }
  }
  return [...scores]
    .map(([key, fusionScore]) => ({ key, fusionScore }))
    .sort((a, b) => b.fusionScore - a.fusionScore || a.key.localeCompare(b.key))
}
