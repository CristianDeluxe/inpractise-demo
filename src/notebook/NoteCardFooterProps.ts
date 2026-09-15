import type { SavedNote } from '@/contracts/SavedNote'
import type { useDeleteNote } from './hooks/useDeleteNote'

export type NoteCardFooterProps = {
  citation: SavedNote['citation']
  createdAt: SavedNote['createdAt']
  removal: ReturnType<typeof useDeleteNote>
}
