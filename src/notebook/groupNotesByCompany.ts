import type { SavedNote } from '@/contracts/SavedNote'
import type { NoteGroup } from './NoteGroup'

/**
 * Company comes from the re-read revision, so a note whose passage is not
 * readable in this view has no company and sits in a final unnamed group.
 */
export function groupNotesByCompany(notes: readonly SavedNote[]): NoteGroup[] {
  const groups = new Map<string | null, SavedNote[]>()
  for (const note of notes) {
    const company = note.citation?.company ?? null
    groups.set(company, [...(groups.get(company) ?? []), note])
  }
  return [...groups.entries()]
    .map(([company, grouped]) => ({ company, notes: grouped }))
    .sort((left, right) => {
      if (left.company === null) return 1
      if (right.company === null) return -1
      return left.company.localeCompare(right.company)
    })
}
