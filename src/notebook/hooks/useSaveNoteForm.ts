import type { Citation } from '@/api/Citation'
import { useState } from 'react'
import { useSaveNote } from './useSaveNote'

/** The draft note text alongside the save request it will eventually send. */
export function useSaveNoteForm(
  citation: Citation,
  question: string | undefined,
) {
  const { status, save } = useSaveNote(citation, question)
  const [note, setNote] = useState('')
  const submit = () => {
    void save(note)
  }
  return { status, note, setNote, submit }
}
