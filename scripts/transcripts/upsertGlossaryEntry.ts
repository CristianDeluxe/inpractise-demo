import type { MemoryEntry } from '@/transcripts/contracts/MemoryEntry.ts'
import type { GlossaryEdit } from './GlossaryEdit.ts'

/** Same `from` and `to`: one more occurrence. A changed `to` starts the entry over. */
export function upsertGlossaryEntry(
  entries: readonly MemoryEntry[],
  edit: GlossaryEdit,
  transcriptId: string,
  now: string,
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
        lastSeenAt: now,
      },
    ]
  const same = existing.to === edit.to
  const updated: MemoryEntry = {
    from: edit.from,
    to: edit.to,
    category: edit.category,
    occurrences: same ? existing.occurrences + 1 : 1,
    sources: same
      ? [...new Set([...existing.sources, transcriptId])]
      : [transcriptId],
    lastSeenAt: now,
  }
  return entries.map((entry) => (entry === existing ? updated : entry))
}
