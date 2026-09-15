import type { SavedNote } from '@/contracts/SavedNote'

export type NoteCardProps = {
  note: SavedNote
  onDeleted: () => void
}
