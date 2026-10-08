import { X } from 'lucide-react'
import { useDismissedId } from '../hooks/useDismissedId'
import { EditSummary } from './EditSummary'
import type { MobileEditSheetProps } from './MobileEditSheetProps'
import { VerdictButtons } from './VerdictButtons'

/** Below the large breakpoint the inspector becomes a sheet over the bottom of the text. */
export function MobileEditSheet({ edit, controls }: MobileEditSheetProps) {
  const { dismissedId, dismiss } = useDismissedId()
  if (!edit || dismissedId === edit.id) return null
  return (
    <section
      aria-label="Selected edit"
      className="hover-card fixed inset-x-3 bottom-3 z-40 rounded-2xl border border-border bg-popover p-4 lg:hidden"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={() => {
          dismiss(edit.id)
        }}
        className="absolute right-2 top-2 grid size-9 place-items-center rounded-full text-muted-foreground hover:bg-secondary"
      >
        <X aria-hidden="true" className="size-4" />
      </button>
      <div className="pr-8">
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
    </section>
  )
}
