import type { RefObject } from 'react'
import type { WaveformPeaks } from '../contracts/WaveformPeaks'
import type { TimeInterval } from '../review/TimeInterval'

export type AudioPlayerProps = {
  readonly src: string | null
  readonly audioRef: RefObject<HTMLAudioElement | null>
  readonly waveform: WaveformPeaks | null
  readonly relisten: readonly TimeInterval[]
  readonly fallbackDuration: number
}
