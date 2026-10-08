import type { RefObject } from 'react'
import type { WaveformPeaks } from '../contracts/WaveformPeaks'
import type { AudioClock } from '../review/AudioClock'
import type { TimeInterval } from '../review/TimeInterval'

export type WaveformSliderProps = {
  readonly audioRef: RefObject<HTMLAudioElement | null>
  readonly clock: AudioClock
  readonly waveform: WaveformPeaks | null
  readonly relisten: readonly TimeInterval[]
}
