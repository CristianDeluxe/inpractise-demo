import { Play } from 'lucide-react'
import { formatTimestamp } from '../formatters/formatTimestamp'
import { EditSummary } from './EditSummary'
import type { FocusedEditCardProps } from './FocusedEditCardProps'
import { VerdictButtons } from './VerdictButtons'

export function FocusedEditCard({
  edit,
  start,
  controls,
}: FocusedEditCardProps) {
  return (
    <section aria-label="Selected edit" className="lab-card p-4">
      <EditSummary edit={edit} />
      <div className="mt-4">
        <VerdictButtons
          verdict={controls.decisions.get(edit.id)}
          onDecide={(next) => {
            controls.decide([edit.id], next)
          }}
        />
      </div>
      <div className="mt-3 flex items-center justify-between gap-3 text-xs text-muted-foreground">
        {start === undefined ? (
          <span />
        ) : (
          <button
            type="button"
            onClick={() => {
              controls.seek(start)
            }}
            className="inline-flex items-center gap-2 rounded-sm py-1 hover:text-foreground"
          >
            <Play aria-hidden="true" className="size-3.5" />
            Play from {formatTimestamp(start)}
          </button>
        )}
        <span className="font-mono">
          <kbd className="kbd">a</kbd> accept <kbd className="kbd">r</kbd>{' '}
          reject
        </span>
      </div>
    </section>
  )
}
