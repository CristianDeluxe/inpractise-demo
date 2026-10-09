import { ChevronDown, ChevronUp } from 'lucide-react'
import type { ReviewNavigationProps } from './ReviewNavigationProps'
import { SaveIndicator } from './SaveIndicator'
import { UndoButton } from './UndoButton'

/** Pending count, save state, undo, flagged-paragraph stepping. */
export function ReviewNavigation(props: ReviewNavigationProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <p
        role="status"
        className="whitespace-nowrap font-mono text-xs tabular-nums text-muted-foreground"
      >
        {String(props.pending)} edits pending
      </p>
      <SaveIndicator state={props.saveState} />
      <UndoButton canUndo={props.canUndo} onUndo={props.onUndo} />
      <div className="flex" role="group" aria-label="Flagged paragraphs">
        <button
          type="button"
          aria-label="Previous flagged paragraph (k)"
          className="icon-action rounded-r-none"
          onClick={props.onPrevious}
        >
          <ChevronUp aria-hidden="true" className="size-4" />
        </button>
        <button
          type="button"
          aria-label="Next flagged paragraph (j)"
          className="icon-action -ml-px rounded-l-none"
          onClick={props.onNext}
        >
          <ChevronDown aria-hidden="true" className="size-4" />
        </button>
      </div>
    </div>
  )
}
