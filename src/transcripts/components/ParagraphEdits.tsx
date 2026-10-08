import { countPending } from '../review/countPending'
import { EditCard } from './EditCard'
import type { ParagraphEditsProps } from './ParagraphEditsProps'

export function ParagraphEdits({ edits, controls }: ParagraphEditsProps) {
  if (edits.length === 0) return null
  const pending = countPending(edits, controls.decisions)
  return (
    <div className="mt-4 space-y-3">
      <ul className="grid gap-3 lg:grid-cols-2">
        {edits.map((edit) => (
          <EditCard key={edit.id} edit={edit} controls={controls} />
        ))}
      </ul>
      {pending > 1 ? (
        <button
          type="button"
          className="quiet-action"
          onClick={() => {
            controls.decide(
              edits
                .filter((edit) => !controls.decisions.has(edit.id))
                .map((edit) => edit.id),
              'accepted',
            )
          }}
        >
          Accept all {String(pending)} pending in this paragraph
        </button>
      ) : null}
    </div>
  )
}
