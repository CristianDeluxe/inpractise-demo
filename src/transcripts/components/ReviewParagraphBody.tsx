import { ConfidenceWords } from './ConfidenceWords'
import { DiffBody } from './DiffBody'
import { FinalBody } from './FinalBody'
import { InlineBody } from './InlineBody'
import type { ReviewParagraphBodyProps } from './ReviewParagraphBodyProps'

export function ReviewParagraphBody({
  paragraph,
  corrected,
  mode,
  controls,
}: ReviewParagraphBodyProps) {
  if (mode === 'final') {
    return (
      <FinalBody
        paragraph={paragraph}
        corrected={corrected}
        controls={controls}
      />
    )
  }
  if (corrected && (mode === 'inline' || mode === 'spotcheck')) {
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
