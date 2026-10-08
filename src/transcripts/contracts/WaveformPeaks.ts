/** Loudness envelope of an episode: `peaks` are evenly spaced RMS levels in 0..1. */
export type WaveformPeaks = {
  readonly durationSeconds: number
  readonly peaks: readonly number[]
}
