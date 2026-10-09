import { formatTimestamp } from '../formatters/formatTimestamp'
import { paragraphElementId } from '../review/paragraphElementId'
import type { ParagraphFrameProps } from './ParagraphFrameProps'

/** The anchor and focus outline of one paragraph; its body lays out the speaker-turn rows. */
export function ParagraphFrame({
  paragraphId,
  start,
  focused,
  children,
}: ParagraphFrameProps) {
  return (
    <section
      id={paragraphElementId(paragraphId)}
      data-paragraph-id={paragraphId}
      data-start={start}
      aria-label={`Paragraph at ${formatTimestamp(start)}`}
      className={`scroll-mt-64 rounded-lg border px-3 transition-colors duration-200 md:px-4 ${focused ? 'border-border bg-card' : 'border-transparent'}`}
    >
      {children}
    </section>
  )
}
