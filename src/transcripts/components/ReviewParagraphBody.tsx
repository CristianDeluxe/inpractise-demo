import { ConfidenceWords } from './ConfidenceWords'
import { DiffBody } from './DiffBody'
import { InlineBody } from './InlineBody'
import type { ReviewParagraphBodyProps } from './ReviewParagraphBodyProps'

export function ReviewParagraphBody({
  paragraph,
  corrected,
  mode,
  controls,
}: ReviewParagraphBodyProps) {
  if (corrected && mode === 'inline') {
    return (
      <InlineBody
        paragraph={paragraph}
        corrected={corrected}
        controls={controls}
      />
    )
  }
  if (corrected && mode === 'diff') {
    return (
      <DiffBody
        paragraph={paragraph}
        corrected={corrected}
        controls={controls}
      />
    )
  }
  return <ConfidenceWords words={paragraph.words} onSeek={controls.seek} />
}
