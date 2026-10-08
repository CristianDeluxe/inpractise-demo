import { Undo2 } from 'lucide-react'
import type { UndoButtonProps } from './UndoButtonProps'

/** Reverts the newest decision; icon only on a phone. */
export function UndoButton({ canUndo, onUndo }: UndoButtonProps) {
  return (
    <button
      type="button"
      disabled={!canUndo}
      onClick={onUndo}
      aria-label="Undo last decision (u)"
      title="Undo last decision (u)"
      className="quiet-action min-h-11 gap-2 whitespace-nowrap rounded-full disabled:cursor-not-allowed disabled:opacity-40 md:min-h-0"
    >
      <Undo2 aria-hidden="true" className="size-4" />
      <span className="hidden sm:inline">Undo</span>
      <kbd className="kbd hidden sm:inline">u</kbd>
    </button>
  )
}
