import { useParagraphDiff } from '../hooks/useParagraphDiff'
import { ConfidenceWords } from './ConfidenceWords'
import { CorrectedTokens } from './CorrectedTokens'
import type { DiffBodyProps } from './DiffBodyProps'
import { ParagraphEdits } from './ParagraphEdits'

/** Raw words on the left, the corrected text (honouring rejections) on the right. */
export function DiffBody({ paragraph, corrected, controls }: DiffBodyProps) {
  const { tokens, diff } = useParagraphDiff(
    paragraph,
    corrected,
    controls.decisions,
  )
  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 md:gap-8">
        <ConfidenceWords
          words={paragraph.words}
          onSeek={controls.seek}
          struck={diff.rawChanged}
        />
        <CorrectedTokens tokens={tokens} inserted={diff.correctedChanged} />
      </div>
      <ParagraphEdits edits={corrected.edits} controls={controls} />
    </>
  )
}
