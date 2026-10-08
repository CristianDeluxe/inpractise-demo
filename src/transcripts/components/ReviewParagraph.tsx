import { paragraphNote } from '../review/paragraphNote'
import { ConfidenceWords } from './ConfidenceWords'
import { DiffBody } from './DiffBody'
import { ParagraphFrame } from './ParagraphFrame'
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
      {mode === 'diff' && corrected ? (
        <DiffBody
          paragraph={paragraph}
          corrected={corrected}
          controls={controls}
        />
      ) : (
        <ConfidenceWords words={paragraph.words} onSeek={controls.seek} />
      )}
    </ParagraphFrame>
  )
}
