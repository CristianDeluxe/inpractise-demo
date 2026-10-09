import { formatTimestamp } from '../formatters/formatTimestamp'
import { ParagraphGutter } from './ParagraphGutter'
import type { TurnRowProps } from './TurnRowProps'

/** One speaker turn in every view: timestamp and speaker on the left, the view's text on the right. */
export function TurnRow({
  start,
  note,
  active,
  onSeek,
  children,
}: TurnRowProps) {
  return (
    <div
      role="group"
      aria-label={`Turn at ${formatTimestamp(start)}`}
      aria-current={active ? 'true' : undefined}
      data-playing={active ? 'true' : undefined}
      className="relative grid gap-1 border-t border-border/70 py-5 md:grid-cols-[4.5rem_minmax(0,1fr)] md:gap-5"
    >
      {active ? (
        <span
          aria-hidden="true"
          className="absolute inset-y-5 -left-3 w-[3px] rounded-full bg-primary md:-left-4"
        />
      ) : null}
      <ParagraphGutter start={start} note={note} onSeek={onSeek} />
      <div className="min-w-0">{children}</div>
    </div>
  )
}
