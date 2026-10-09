import { ConfidenceBody } from './ConfidenceBody'
import { DiffBody } from './DiffBody'
import { FinalBody } from './FinalBody'
import { InlineBody } from './InlineBody'
import type { ReviewParagraphBodyProps } from './ReviewParagraphBodyProps'

/** Picks the view's text; every view lays the paragraph out as the same speaker-turn rows. */
export function ReviewParagraphBody({
  paragraph,
  corrected,
  mode,
  controls,
  active,
  note,
}: ReviewParagraphBodyProps) {
  if (mode === 'final') {
    return (
      <FinalBody
        paragraph={paragraph}
        corrected={corrected}
        controls={controls}
        active={active}
      />
    )
  }
  const shared = { paragraph, controls, note, active }
  if (corrected && (mode === 'inline' || mode === 'spotcheck'))
    return <InlineBody {...shared} corrected={corrected} />
  if (corrected && mode === 'diff')
    return <DiffBody {...shared} corrected={corrected} />
  return (
    <ConfidenceBody
      paragraph={paragraph}
      corrected={corrected}
      note={note}
      active={active}
      onSeek={controls.seek}
    />
  )
}
