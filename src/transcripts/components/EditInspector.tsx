import type { EditInspectorProps } from './EditInspectorProps'
import { FocusedEditCard } from './FocusedEditCard'
import { InspectorEmptyState } from './InspectorEmptyState'
import { ParagraphEditList } from './ParagraphEditList'
import { ReviewProgress } from './ReviewProgress'

/** Side panel: the selected edit with its decision, the rest of its paragraph, and episode progress. */
export function EditInspector({
  edits,
  startById,
  controls,
}: EditInspectorProps) {
  const focused = edits.find((edit) => edit.id === controls.focusedEditId)
  const siblings = focused
    ? edits.filter((edit) => edit.paragraphId === focused.paragraphId)
    : []
  return (
    <aside aria-label="Edit inspector" className="hidden lg:block">
      <div className="sticky top-[calc(var(--lab-console-bottom,9rem)+1rem)] space-y-3">
        {focused ? (
          <FocusedEditCard
            edit={focused}
            start={startById.get(focused.paragraphId)}
            controls={controls}
          />
        ) : (
          <InspectorEmptyState />
        )}
        {siblings.length > 1 ? (
          <ParagraphEditList edits={siblings} controls={controls} />
        ) : null}
        <ReviewProgress edits={edits} decisions={controls.decisions} />
      </div>
    </aside>
  )
}
