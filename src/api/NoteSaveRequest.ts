import type { ViewAs } from './ViewAs.ts'

export type NoteSaveRequest = {
  viewAs?: ViewAs
  action: 'note_save'
  documentId: string
  revisionId: string
  passageId: string
  question?: string
  note?: string
}
