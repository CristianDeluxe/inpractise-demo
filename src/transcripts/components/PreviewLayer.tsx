import { EditHoverCard } from './EditHoverCard'
import type { PreviewLayerProps } from './PreviewLayerProps'

/** Renders the hover card for whichever mark is under the pointer, if any. */
export function PreviewLayer({ preview, edits, controls }: PreviewLayerProps) {
  const current = preview.preview
  if (!current) return null
  const edit = edits.find((candidate) => candidate.id === current.editId)
  if (!edit) return null
  return (
    <EditHoverCard
      preview={current}
      edit={edit}
      verdict={controls.decisions.get(edit.id)}
      onDecide={(next) => {
        controls.decide([edit.id], next)
      }}
      onHold={preview.hold}
      onRelease={preview.close}
    />
  )
}
