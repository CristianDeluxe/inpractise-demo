import { X } from 'lucide-react'
import { useDismissedId } from '../hooks/useDismissedId'
import { EditNavigator } from './EditNavigator'
import { EditSummary } from './EditSummary'
import type { MobileEditSheetProps } from './MobileEditSheetProps'
import { ReplayEditButton } from './ReplayEditButton'
import { VerdictButtons } from './VerdictButtons'

/** Below the large breakpoint the inspector becomes a sheet; the text scrolls the mark above it. */
export function MobileEditSheet({
  edit,
  edits,
  span,
  controls,
}: MobileEditSheetProps) {
  const { dismissedId, dismiss } = useDismissedId()
  if (!edit || dismissedId === edit.id) return null
  return (
    <section
      aria-label="Selected edit"
      className="hover-card fixed inset-x-3 bottom-3 z-40 max-h-[45vh] overflow-y-auto rounded-2xl border border-border bg-popover p-4 lg:hidden"
    >
      <div className="flex items-start gap-2">
        <div className="min-w-0 flex-1">
          <EditNavigator edits={edits} editId={edit.id} controls={controls} />
        </div>
        <button
          type="button"
          aria-label="Close"
          onClick={() => {
            dismiss(edit.id)
          }}
          className="-mr-2 -mt-1 grid size-11 shrink-0 place-items-center rounded-full text-muted-foreground hover:bg-secondary"
        >
          <X aria-hidden="true" className="size-4" />
        </button>
      </div>
      <div className="mt-2">
        <EditSummary edit={edit} />
      </div>
      <div className="mt-3">
        <VerdictButtons
          verdict={controls.decisions.get(edit.id)}
          onDecide={(next) => {
            controls.decide([edit.id], next)
          }}
        />
      </div>
      <div className="mt-2">
        <ReplayEditButton
          span={span}
          onReplay={() => {
            controls.replayEdit(edit.id)
          }}
        />
      </div>
    </section>
  )
}
