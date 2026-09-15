import type { SavedNote } from '@/contracts/SavedNote'

/** Notes under one company slug; null when the evidence could not be re-read. */
export type NoteGroup = {
  company: string | null
  notes: SavedNote[]
}
