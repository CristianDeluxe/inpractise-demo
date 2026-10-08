import { formatTimestamp } from '../formatters/formatTimestamp'
import { paragraphElementId } from '../review/paragraphElementId'
import type { ParagraphFrameProps } from './ParagraphFrameProps'

export function ParagraphFrame({
  paragraphId,
  start,
  active,
  focused,
  note,
  onSeek,
  children,
}: ParagraphFrameProps) {
  const time = formatTimestamp(start)
  return (
    <section
      id={paragraphElementId(paragraphId)}
      aria-label={`Paragraph at ${time}`}
      className={`grid scroll-mt-64 gap-3 border-t border-border px-3 py-6 md:grid-cols-[5.5rem_minmax(0,1fr)] md:gap-6 ${focused ? 'bg-accent/40' : ''} ${active ? 'border-l-4 border-l-primary' : 'border-l-4 border-l-transparent'}`}
    >
      <div className="flex flex-row items-baseline gap-3 md:flex-col md:gap-1">
        <button
          type="button"
          onClick={() => {
            onSeek(start)
          }}
          aria-label={`Play from ${time}`}
          className="meta-text underline-offset-4 hover:text-foreground hover:underline"
        >
          {time}
        </button>
        {note ? <span className="meta-text text-[11px]">{note}</span> : null}
      </div>
      <div>{children}</div>
    </section>
  )
}
