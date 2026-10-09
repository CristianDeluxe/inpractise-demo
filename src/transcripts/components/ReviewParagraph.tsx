import { paragraphNote } from '../review/paragraphNote'
import { ParagraphFrame } from './ParagraphFrame'
import { ReviewParagraphBody } from './ReviewParagraphBody'
import type { ReviewParagraphProps } from './ReviewParagraphProps'

export function ReviewParagraph({
  paragraph,
  corrected,
  mode,
  controls,
  active,
  focused,
}: ReviewParagraphProps) {
  return (
    <ParagraphFrame
      paragraphId={paragraph.id}
      start={paragraph.start}
      focused={focused}
    >
      <ReviewParagraphBody
        paragraph={paragraph}
        corrected={corrected}
        mode={mode}
        controls={controls}
        active={active}
        note={mode === 'final' ? null : paragraphNote(paragraph, corrected)}
      />
    </ParagraphFrame>
  )
}
