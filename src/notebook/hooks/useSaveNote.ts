import type { Citation } from '@/api/Citation'
import { saveNote } from '@/operations/saveNote'
import { useRuntime } from '@/runtime/hooks/useRuntime'
import { useState } from 'react'
import type { SaveNoteStatus } from '../SaveNoteStatus'
import { useNotebookCount } from './useNotebookCount'

/**
 * Sends the passage identity, never its text: the server re-reads the passage
 * as the caller before anything is stored. A blank note is sent as no note.
 */
export function useSaveNote(citation: Citation, question: string | undefined) {
  const runtime = useRuntime()
  const { adjust } = useNotebookCount()
  const [status, setStatus] = useState<SaveNoteStatus>('idle')
  const save = async (note: string) => {
    setStatus('saving')
    const line = note.trim()
    try {
      await saveNote(
        runtime,
        {
          action: 'note_save',
          documentId: citation.documentId,
          revisionId: citation.revisionId,
          passageId: citation.passageId,
          ...(question ? { question } : {}),
          ...(line ? { note: line } : {}),
        },
        new AbortController().signal,
      )
      adjust(1)
      setStatus('saved')
    } catch {
      setStatus('failed')
    }
  }
  return { status, save }
}
