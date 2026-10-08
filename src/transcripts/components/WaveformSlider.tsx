import { formatTimestamp } from '../formatters/formatTimestamp'
import { useWaveformCanvas } from '../hooks/useWaveformCanvas'
import { useWaveformSeek } from '../hooks/useWaveformSeek'
import type { WaveformSliderProps } from './WaveformSliderProps'

/** The episode's loudness as a seekable slider, with the re-listen windows underneath. */
export function WaveformSlider({
  audioRef,
  clock,
  waveform,
  relisten,
}: WaveformSliderProps) {
  const progress = clock.duration > 0 ? clock.currentTime / clock.duration : 0
  const canvasRef = useWaveformCanvas({
    peaks: waveform?.peaks ?? [],
    progress,
    duration: clock.duration,
    relisten,
  })
  const seek = useWaveformSeek(audioRef, clock.duration)
  return (
    <canvas
      ref={canvasRef}
      role="slider"
      tabIndex={0}
      aria-label="Playback position"
      aria-valuemin={0}
      aria-valuemax={Math.round(clock.duration)}
      aria-valuenow={Math.round(clock.currentTime)}
      aria-valuetext={`${formatTimestamp(clock.currentTime)} of ${formatTimestamp(clock.duration)}`}
      {...seek}
      className="block h-12 min-w-0 flex-1 cursor-pointer touch-none rounded-sm"
    />
  )
}
