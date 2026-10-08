import { Fragment } from 'react'
import { EditMark } from './EditMark'
import type { TrackedTextProps } from './TrackedTextProps'

export function TrackedText({ segments, variant, controls }: TrackedTextProps) {
  return (
    <p className="source-text">
      {segments.map((segment, index) =>
        segment.edit ? (
          <EditMark
            key={segment.edit.id}
            edit={segment.edit}
            variant={variant}
            controls={controls}
          />
        ) : (
          <Fragment key={`plain-${String(index)}`}>{segment.text}</Fragment>
        ),
      )}
    </p>
  )
}
