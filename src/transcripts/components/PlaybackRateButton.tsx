import { formatPlaybackRate } from '../formatters/formatPlaybackRate'
import type { PlaybackRateButtonProps } from './PlaybackRateButtonProps'

/** Cycles the playback speed; it sits at the end of the player row. */
export function PlaybackRateButton({
  rate,
  onCycleRate,
}: PlaybackRateButtonProps) {
  return (
    <button
      type="button"
      aria-label="Playback speed"
      onClick={onCycleRate}
      className="icon-action w-auto min-w-11 shrink-0 px-2.5 font-mono text-xs tabular-nums"
    >
      {formatPlaybackRate(rate)}
    </button>
  )
}
