import { segmentOffsets } from '../edits/segmentOffsets'
import { wordsByOffset } from '../review/wordsByOffset'
import { EditMark } from './EditMark'
import { PlainSegment } from './PlainSegment'
import type { TrackedTextProps } from './TrackedTextProps'

export function TrackedText({
  segments,
  words,
  variant,
  controls,
}: TrackedTextProps) {
  const byOffset = wordsByOffset(words)
  const offsets = segmentOffsets(segments)
  return (
    <p className="source-text">
      {segments.map((segment, index) =>
        segment.edit ? (
          <EditMark
            key={`${segment.edit.id}-${String(index)}`}
            edit={segment.edit}
            variant={variant}
            controls={controls}
          />
        ) : (
          <PlainSegment
            key={`plain-${String(index)}`}
            text={segment.text}
            offset={offsets[index] ?? 0}
            words={byOffset}
            onSeek={controls.seek}
          />
        ),
      )}
    </p>
  )
}
