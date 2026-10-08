import { formatTimestamp } from '../formatters/formatTimestamp'
import { useAudioClock } from '../hooks/useAudioClock'
import { togglePlayback } from '../review/togglePlayback'
import type { AudioPlayerProps } from './AudioPlayerProps'
import { PlayToggle } from './PlayToggle'
import { WaveformSlider } from './WaveformSlider'

/** Play button, clock and a waveform that seeks; the orange lane marks audio still to re-listen. */
export function AudioPlayer({
  src,
  audioRef,
  waveform,
  relisten,
  fallbackDuration,
}: AudioPlayerProps) {
  const clock = useAudioClock(
    audioRef,
    waveform?.durationSeconds ?? fallbackDuration,
  )
  return (
    <div className="flex items-center gap-3">
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        aria-label="Episode audio"
        className="hidden"
      >
        <track kind="captions" />
      </audio>
      <PlayToggle
        playing={clock.playing}
        onToggle={() => {
          void togglePlayback(audioRef.current)
        }}
      />
      <span className="w-[6.5rem] shrink-0 font-mono text-xs tabular-nums text-muted-foreground">
        {formatTimestamp(clock.currentTime)} / {formatTimestamp(clock.duration)}
      </span>
      <WaveformSlider
        audioRef={audioRef}
        clock={clock}
        waveform={waveform}
        relisten={relisten}
      />
    </div>
  )
}
