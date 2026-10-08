import { useMediaQuery } from '../hooks/useMediaQuery'
import { inspectorMediaQuery } from '../review/inspectorMediaQuery'
import { EditHoverCard } from './EditHoverCard'
import type { PreviewLayerProps } from './PreviewLayerProps'

/** The hover card, only where no inspector is on screen to show the preview instead. */
export function PreviewLayer({ preview, edits, controls }: PreviewLayerProps) {
  const inspectorShown = useMediaQuery(inspectorMediaQuery)
  const current = preview.preview
  if (!current || inspectorShown) return null
  // The selected edit already has the sheet; a second card would cover it.
  if (current.editId === controls.focusedEditId) return null
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
