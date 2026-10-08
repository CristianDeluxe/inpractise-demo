import { Info } from 'lucide-react'
import type { ReportPendingNoteProps } from './ReportPendingNoteProps'

export function ReportPendingNote({ count }: ReportPendingNoteProps) {
  if (count === 0) return null
  return (
    <p
      role="note"
      className="mt-5 flex items-start gap-2 rounded-xl bg-accent/60 px-4 py-3 text-sm leading-relaxed text-accent-foreground print:bg-transparent print:text-black"
    >
      <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
      <span>
        Preview: {String(count)} {count === 1 ? 'edit is' : 'edits are'} not
        accepted yet. Underlined wording is unreviewed; struck words would be
        removed.
      </span>
    </p>
  )
}
