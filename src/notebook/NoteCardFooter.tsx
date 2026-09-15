import { formatPublishedDate } from '@/components/formatters/formatPublishedDate'
import { Link } from '@tanstack/react-router'
import type { NoteCardFooterProps } from './NoteCardFooterProps'

/** The open-passage link, save date, delete action, and its failure notice. */
export function NoteCardFooter({
  citation,
  createdAt,
  removal,
}: NoteCardFooterProps) {
  return (
    <>
      <div className="mt-4 flex flex-wrap items-center gap-5 text-sm">
        {citation ? (
          <Link
            to={citation.readerPath}
            className="text-primary underline"
            aria-label={`Open exact passage ${citation.citationId}`}
          >
            Open exact passage
          </Link>
        ) : null}
        <span className="text-xs text-muted-foreground">
          Saved {formatPublishedDate(createdAt)}
        </span>
        <button
          type="button"
          className="quiet-action"
          disabled={removal.status === 'deleting'}
          onClick={() => {
            void removal.remove()
          }}
        >
          Delete note
        </button>
      </div>
      {removal.status === 'failed' ? (
        <p role="alert" className="mt-2 text-sm text-destructive">
          This note could not be deleted.
        </p>
      ) : null}
    </>
  )
}
