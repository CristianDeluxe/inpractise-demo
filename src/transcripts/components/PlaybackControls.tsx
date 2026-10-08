import { RotateCcw, RotateCw } from 'lucide-react'
import { formatPlaybackRate } from '../formatters/formatPlaybackRate'
import type { PlaybackControlsProps } from './PlaybackControlsProps'

/** Two-second jumps and the speed button that sit beside the play button. */
export function PlaybackControls({
  rate,
  onBack,
  onForward,
  onCycleRate,
}: PlaybackControlsProps) {
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
      <button
        type="button"
        aria-label="Playback speed"
        onClick={onCycleRate}
        className="icon-action w-auto min-w-11 px-2.5 font-mono text-xs tabular-nums"
      >
        {formatPlaybackRate(rate)}
      </button>
    </div>
  )
}
