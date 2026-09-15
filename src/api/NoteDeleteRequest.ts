import type { ViewAs } from './ViewAs.ts'

export type NoteDeleteRequest = {
  viewAs?: ViewAs
  action: 'note_delete'
  noteId: string
}
