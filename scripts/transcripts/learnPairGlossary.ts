import type { MemoryEntry } from '@/transcripts/contracts/MemoryEntry.ts'
import type { HunkTally } from './HunkTally.ts'
import { upsertGlossaryEntry } from './upsertGlossaryEntry.ts'

/**
 * Folds tallies seen at least minOccurrences times into the glossary, one
 * source per pair. A pair is named after its transcript, so a transcript
 * already learned from its review is not counted a second time.
 */
export function learnPairGlossary(
  glossary: readonly MemoryEntry[],
  tallies: readonly HunkTally[],
  minOccurrences: number,
  now: string,
): MemoryEntry[] {
  return tallies
    .filter((tally) => tally.count >= minOccurrences)
    .toSorted((a, b) => a.count - b.count)
    .reduce<MemoryEntry[]>(
      (entries, tally) =>
        tally.sources.reduce(
          (current, source) =>
            upsertGlossaryEntry(
              current,
              { from: tally.from, to: tally.to, category: tally.category },
              source,
              now,
            ),
          entries,
        ),
      [...glossary],
    )
}
