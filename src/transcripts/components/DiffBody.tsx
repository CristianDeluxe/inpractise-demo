import { useParagraphDiff } from '../hooks/useParagraphDiff'
import { useSegments } from '../hooks/useSegments'
import { ConfidenceWords } from './ConfidenceWords'
import type { DiffBodyProps } from './DiffBodyProps'
import { TrackedText } from './TrackedText'

/** Raw words on the left, the corrected text (honouring rejections) on the right. */
export function DiffBody({ paragraph, corrected, controls }: DiffBodyProps) {
  const struck = useParagraphDiff(paragraph, corrected, controls.decisions)
  const segments = useSegments(paragraph, corrected)
  return (
    <div className="grid gap-5 md:grid-cols-2 md:gap-8">
      <ConfidenceWords
        words={paragraph.words}
        onSeek={controls.seek}
        struck={struck}
      />
      <TrackedText
        segments={segments}
        variant="corrected"
        controls={controls}
      />
    </div>
  )
}
