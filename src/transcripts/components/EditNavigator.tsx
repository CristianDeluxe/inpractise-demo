import { ArrowRight } from 'lucide-react'
import { formatCount } from '../formatters/formatCount'
import { countPending } from '../review/countPending'
import { editPosition } from '../review/editPosition'
import type { EditNavigatorProps } from './EditNavigatorProps'

/** Where this edit sits in the episode, and the way to the next undecided one. */
export function EditNavigator({ edits, editId, controls }: EditNavigatorProps) {
  const pending = countPending(edits, controls.decisions)
  return (
    <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
      <span className="font-mono tabular-nums">
        Edit {formatCount(editPosition(edits, editId))} of{' '}
        {formatCount(edits.length)} · {formatCount(pending)} pending
      </span>
      <button
        type="button"
        disabled={pending === 0}
        onClick={controls.nextPending}
        className="inline-flex min-h-9 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-2 font-medium text-foreground transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next pending
        <kbd className="kbd">n</kbd>
        <ArrowRight aria-hidden="true" className="size-3.5" />
      </button>
    </div>
  )
}
