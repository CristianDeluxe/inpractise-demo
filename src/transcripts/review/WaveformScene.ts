import type { TimeInterval } from './TimeInterval'
import type { WaveformPalette } from './WaveformPalette'

/** Everything one frame of the waveform needs, in CSS pixels. */
export type WaveformScene = {
  readonly width: number
  readonly height: number
  readonly bars: readonly number[]
  readonly progress: number
  readonly duration: number
  readonly relisten: readonly TimeInterval[]
  readonly palette: WaveformPalette
}
