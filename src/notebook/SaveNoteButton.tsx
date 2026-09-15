import { Link } from '@tanstack/react-router'
import { useSaveNoteForm } from './hooks/useSaveNoteForm'
import type { SaveNoteButtonProps } from './SaveNoteButtonProps'
import { SaveNoteForm } from './SaveNoteForm'

/** Collapsed until asked for, so a citation card stays a citation card. */
export function SaveNoteButton({ citation, question }: SaveNoteButtonProps) {
  const { status, note, setNote, submit } = useSaveNoteForm(citation, question)
  if (status === 'saved')
    return (
      <p role="status" className="mt-4 text-sm text-success">
        Saved to notebook.{' '}
        <Link to="/app/notes" className="underline">
          Open notebook
        </Link>
      </p>
    )
  return (
    <SaveNoteForm
      citationId={citation.citationId}
      status={status}
      note={note}
      setNote={setNote}
      submit={submit}
    />
  )
}
