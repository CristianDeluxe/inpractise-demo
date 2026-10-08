import { DiffColumnLabels } from './DiffColumnLabels'
import type { ReviewListProps } from './ReviewListProps'
import { ReviewParagraph } from './ReviewParagraph'

export function ReviewList({
  paragraphs,
  correctedById,
  mode,
  controls,
  activeId,
  focusedParagraphId,
}: ReviewListProps) {
  if (paragraphs.length === 0) {
    return (
      <p role="status" className="rule-top mt-6 py-10 text-muted-foreground">
        Nothing in this transcript needs attention. Switch to All to read it.
      </p>
    )
  }
  return (
    <div>
      {mode === 'diff' ? <DiffColumnLabels /> : null}
      {paragraphs.map((paragraph) => (
        <ReviewParagraph
          key={paragraph.id}
          paragraph={paragraph}
          corrected={correctedById.get(paragraph.id)}
          mode={mode}
          controls={controls}
          active={activeId === paragraph.id}
          focused={focusedParagraphId === paragraph.id}
        />
      ))}
    </div>
  )
}
