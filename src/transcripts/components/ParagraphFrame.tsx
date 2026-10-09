import { formatTimestamp } from '../formatters/formatTimestamp'
import { paragraphElementId } from '../review/paragraphElementId'
import type { ParagraphFrameProps } from './ParagraphFrameProps'
import { ParagraphGutter } from './ParagraphGutter'

export function ParagraphFrame({
  paragraphId,
  start,
  wide = false,
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
      data-paragraph-id={paragraphId}
      data-start={start}
      aria-label={`Paragraph at ${time}`}
      data-playing={active ? 'true' : undefined}
      className={`relative grid scroll-mt-64 gap-1 rounded-lg border px-3 py-4 transition-colors duration-200 md:grid-cols-[4.5rem_minmax(0,1fr)] md:gap-5 md:px-4 ${focused ? 'border-border bg-card' : 'border-transparent'}`}
    >
      {active ? (
        <span
          aria-hidden="true"
          className="absolute inset-y-4 left-0 w-[3px] rounded-full bg-primary"
        />
      ) : null}
      <ParagraphGutter start={start} note={note} onSeek={onSeek} />
      <div className={wide ? 'min-w-0' : 'min-w-0 max-w-[70ch]'}>
        {children}
      </div>
    </section>
  )
}
