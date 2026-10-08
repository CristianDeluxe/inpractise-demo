import { EditAudioButtons } from './EditAudioButtons'
import { EditNavigator } from './EditNavigator'
import { EditSummary } from './EditSummary'
import type { FocusedEditCardProps } from './FocusedEditCardProps'
import { VerdictButtons } from './VerdictButtons'

export function FocusedEditCard({
  edit,
  edits,
  span,
  previewing,
  controls,
}: FocusedEditCardProps) {
  return (
    <section
      aria-label={previewing ? 'Edit under the pointer' : 'Selected edit'}
      className={`lab-card p-4 ${previewing ? 'border-dashed' : ''}`}
    >
      <EditNavigator edits={edits} editId={edit.id} controls={controls} />
      <div className="mt-3">
        <EditSummary edit={edit} />
      </div>
      <div className="mt-4">
        <VerdictButtons
          verdict={controls.decisions.get(edit.id)}
          onDecide={(next) => {
            controls.decide([edit.id], next)
          }}
        />
      </div>
      <div className="mt-3">
        <EditAudioButtons editId={edit.id} span={span} controls={controls} />
      </div>
    </section>
  )
}
