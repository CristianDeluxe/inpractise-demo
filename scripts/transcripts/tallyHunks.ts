import type { HunkTally } from './HunkTally.ts'
import { isLearnableHunk } from './isLearnableHunk.ts'
import { matchKey } from './matchKey.ts'
import type { PairAnalysis } from './PairAnalysis.ts'
import { splitWords } from './splitWords.ts'

/** Counts learnable hunks across all pairs by (from-key, to), most frequent first. */
export function tallyHunks(analyses: readonly PairAnalysis[]): HunkTally[] {
  const tallies = new Map<string, HunkTally>()
  for (const analysis of analyses)
    for (const hunk of analysis.classified.filter((item) =>
      isLearnableHunk(item),
    )) {
      const key = `${splitWords(hunk.from).map(matchKey).join(' ')}\u0000${hunk.to}`
      const known = tallies.get(key)
      tallies.set(key, {
        from: known?.from ?? hunk.from,
        to: hunk.to,
        category: hunk.category,
        count: (known?.count ?? 0) + 1,
        sources: [...new Set([...(known?.sources ?? []), analysis.name])],
      })
    }
  return [...tallies.values()].toSorted((a, b) => b.count - a.count)
}
