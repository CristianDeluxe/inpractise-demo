import { deleteNote } from '@/operations/deleteNote'
import { useRuntime } from '@/runtime/hooks/useRuntime'
import { useState } from 'react'
import type { DeleteNoteStatus } from '../DeleteNoteStatus'
import { useNotebookCount } from './useNotebookCount'

export function useDeleteNote(noteId: string, onDeleted: () => void) {
  const runtime = useRuntime()
  const { adjust } = useNotebookCount()
  const [status, setStatus] = useState<DeleteNoteStatus>('idle')
  const remove = async () => {
    setStatus('deleting')
    try {
      await deleteNote(
        runtime,
        { action: 'note_delete', noteId },
        new AbortController().signal,
      )
      adjust(-1)
      onDeleted()
    } catch {
      setStatus('failed')
    }
  }
  return { status, remove }
}
