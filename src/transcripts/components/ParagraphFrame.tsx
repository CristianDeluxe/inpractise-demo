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
      data-playing={active ? 'true' : undefined}
      className={`relative grid scroll-mt-64 gap-2 rounded-2xl px-4 py-5 transition-[background-color,box-shadow] duration-200 md:grid-cols-[4.5rem_minmax(0,1fr)] md:gap-6 md:px-5 ${focused ? 'bg-card shadow-[0_0_0_1px_var(--color-border),0_18px_40px_-28px_oklch(0.203_0.032_252/45%)]' : ''}`}
    >
      {active ? (
        <span
          aria-hidden="true"
          className="absolute inset-y-5 left-0 w-[3px] rounded-full bg-primary"
        />
      ) : null}
      <div className="flex flex-row items-baseline gap-3 md:flex-col md:gap-2">
        <button
          type="button"
          onClick={() => {
            onSeek(start)
          }}
          aria-label={`Play from ${time}`}
          className="inline-flex min-h-11 items-center font-mono text-xs tabular-nums md:min-h-0 text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
        >
          {time}
        </button>
        {note ? (
          <span className="font-mono text-xs leading-snug text-muted-foreground">
            {note}
          </span>
        ) : null}
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  )
}
