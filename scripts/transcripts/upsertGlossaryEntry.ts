import type { MemoryEntry } from '@/transcripts/contracts/MemoryEntry.ts'
import type { GlossaryEdit } from './GlossaryEdit.ts'
import type { GlossarySighting } from './GlossarySighting.ts'
import { strongerBasis } from './strongerBasis.ts'

/** Same `from` and `to` from a new source: one more occurrence. A known source adds nothing; a changed `to` starts over. */
export function upsertGlossaryEntry(
  entries: readonly MemoryEntry[],
  edit: GlossaryEdit,
  { transcriptId, seenAt, basis }: GlossarySighting,
): MemoryEntry[] {
  const existing = entries.find((entry) => entry.from === edit.from)
  if (existing === undefined)
    return [
      ...entries,
      {
        from: edit.from,
        to: edit.to,
        category: edit.category,
        occurrences: 1,
        sources: [transcriptId],
        lastSeenAt: seenAt,
        basis,
      },
    ]
  const same = existing.to === edit.to
  const known = same && existing.sources.includes(transcriptId)
  const updated: MemoryEntry = {
    from: edit.from,
    to: edit.to,
    category: edit.category,
    occurrences: same ? existing.occurrences + (known ? 0 : 1) : 1,
    sources: same
      ? [...new Set([...existing.sources, transcriptId])]
      : [transcriptId],
    lastSeenAt: seenAt,
    basis: same ? strongerBasis(existing.basis, basis) : basis,
  }
  return entries.map((entry) => (entry === existing ? updated : entry))
}
