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
      active={active}
      focused={focused}
      note={paragraphNote(paragraph, corrected)}
      onSeek={controls.seek}
    >
      <ReviewParagraphBody
        paragraph={paragraph}
        corrected={corrected}
        mode={mode}
        controls={controls}
      />
    </ParagraphFrame>
  )
}
