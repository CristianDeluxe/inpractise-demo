import type { EditInspectorProps } from './EditInspectorProps'
import { FocusedEditCard } from './FocusedEditCard'
import { InspectorEmptyState } from './InspectorEmptyState'
import { KeysCard } from './KeysCard'
import { ParagraphEditList } from './ParagraphEditList'
import { ReviewProgress } from './ReviewProgress'

/** Side panel: the hovered or selected edit with its decision, the rest of its paragraph, and progress. */
export function EditInspector({
  edits,
  spanById,
  previewId,
  controls,
  inRail = false,
}: EditInspectorProps) {
  const previewed = edits.find((edit) => edit.id === previewId)
  const focused = edits.find((edit) => edit.id === controls.focusedEditId)
  const shown = previewed ?? focused
  const siblings = shown
    ? edits.filter((edit) => edit.paragraphId === shown.paragraphId)
    : []
  return (
    <aside aria-label="Edit inspector" className="hidden lg:block">
      <div
        className={`space-y-3 ${inRail ? '' : 'sticky top-[calc(var(--lab-console-bottom,9rem)+1rem)]'}`}
      >
        {shown ? (
          <FocusedEditCard
            edit={shown}
            edits={edits}
            span={spanById.get(shown.id)}
            previewing={shown !== focused}
            controls={controls}
          />
        ) : (
          <InspectorEmptyState />
        )}
        {siblings.length > 1 ? (
          <ParagraphEditList edits={siblings} controls={controls} />
        ) : null}
        <ReviewProgress edits={edits} decisions={controls.decisions} />
        <KeysCard />
      </div>
    </aside>
  )
}
