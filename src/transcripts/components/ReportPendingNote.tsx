import { Info } from 'lucide-react'
import { formatCount } from '../formatters/formatCount'
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
        {`This is the AI-final text. ${formatCount(count)} underlined ${count === 1 ? 'word is' : 'words are'} below the reliable threshold; checking them is optional.`}
      </span>
    </p>
  )
}
