import type { SaveNoteStatus } from './SaveNoteStatus'

export type SaveNoteFormProps = {
  citationId: string
  status: SaveNoteStatus
  note: string
  setNote: (note: string) => void
  submit: () => void
}
