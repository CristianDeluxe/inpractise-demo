import type { ViewAs } from './ViewAs.ts'

export type NoteListRequest = {
  viewAs?: ViewAs
  action: 'note_list'
}
