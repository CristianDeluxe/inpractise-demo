import type { MemoryEntry } from '@/transcripts/contracts/MemoryEntry.ts'
import { findWholeWordOccurrences } from './findWholeWordOccurrences.ts'
import type { GlossaryMatch } from './GlossaryMatch.ts'

/** Longest `from` wins; overlapping matches are dropped. */
export function findGlossaryMatches(
  text: string,
  glossary: readonly MemoryEntry[],
): GlossaryMatch[] {
  const accepted: GlossaryMatch[] = []
  const entries = glossary
    .filter((entry) => entry.from !== entry.to)
    .toSorted((a, b) => b.from.length - a.from.length)
  for (const entry of entries) {
    for (const start of findWholeWordOccurrences(text, entry.from)) {
      const end = start + entry.from.length
      const overlaps = accepted.some(
        (match) => start < match.end && end > match.start,
      )
      if (!overlaps) accepted.push({ start, end, entry })
    }
  }
  return accepted.toSorted((a, b) => a.start - b.start)
}
