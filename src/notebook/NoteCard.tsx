import { useDeleteNote } from './hooks/useDeleteNote'
import { NoteCardFooter } from './NoteCardFooter'
import type { NoteCardProps } from './NoteCardProps'
import { NoteEvidence } from './NoteEvidence'

export function NoteCard({ note, onDeleted }: NoteCardProps) {
  const removal = useDeleteNote(note.noteId, onDeleted)
  return (
    <li className="rounded-lg border border-border bg-card p-5">
      {note.question ? (
        <p className="text-sm font-medium">{note.question}</p>
      ) : null}
      {note.note ? (
        <p className="mt-1 text-sm text-muted-foreground">{note.note}</p>
      ) : null}
      <div className="mt-4">
        {note.citation ? (
          <NoteEvidence citation={note.citation} />
        ) : (
          <p className="text-sm text-muted-foreground">
            Evidence not readable in this view.
          </p>
        )}
      </div>
      <NoteCardFooter
        citation={note.citation}
        createdAt={note.createdAt}
        removal={removal}
      />
    </li>
  )
}
