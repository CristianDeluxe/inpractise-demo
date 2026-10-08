import { ChevronDown, ChevronUp, FileText } from 'lucide-react'
import type { ReviewNavigationProps } from './ReviewNavigationProps'
import { SaveIndicator } from './SaveIndicator'

/** Pending count, save state, flagged-paragraph stepping and the report link. */
export function ReviewNavigation(props: ReviewNavigationProps) {
  return (
    <div className="ml-auto flex items-center gap-2">
      <p
        role="status"
        className="whitespace-nowrap font-mono text-xs tabular-nums text-muted-foreground"
      >
        {String(props.pending)} edits pending
      </p>
      <SaveIndicator state={props.saveState} />
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
      <button
        type="button"
        className="quiet-action min-h-11 gap-2 whitespace-nowrap rounded-full md:min-h-0"
        onClick={props.onOpenReport}
      >
        <FileText aria-hidden="true" className="size-4" />
        Open report
      </button>
    </div>
  )
}
