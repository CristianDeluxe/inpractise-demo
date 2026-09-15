import { formatCompanyName } from '@/components/formatters/formatCompanyName'
import { NoteCard } from './NoteCard'
import type { NotebookGroupProps } from './NotebookGroupProps'

export function NotebookGroup({ group, onChange }: NotebookGroupProps) {
  const title =
    group.company === null
      ? 'Evidence not readable in this view'
      : formatCompanyName(group.company)
  return (
    <section aria-label={title} className="mt-8">
      <h2 className="font-sans text-xl">{title}</h2>
      <ul className="mt-4 space-y-4">
        {group.notes.map((note) => (
          <NoteCard key={note.noteId} note={note} onDeleted={onChange} />
        ))}
      </ul>
    </section>
  )
}
