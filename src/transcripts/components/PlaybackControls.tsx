import { RotateCcw, RotateCw } from 'lucide-react'
import type { PlaybackControlsProps } from './PlaybackControlsProps'

/** The two-second jumps that sit beside the play button. */
export function PlaybackControls({ onBack, onForward }: PlaybackControlsProps) {
  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        aria-label="Back 2 seconds"
        onClick={onBack}
        className="icon-action"
      >
        <RotateCcw aria-hidden="true" className="size-4" />
      </button>
      <button
        type="button"
        aria-label="Forward 2 seconds"
        onClick={onForward}
        className="icon-action"
      >
        <RotateCw aria-hidden="true" className="size-4" />
      </button>
    </div>
  )
}
