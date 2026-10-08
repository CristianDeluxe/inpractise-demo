import type { TimeInterval } from './TimeInterval'

export type WaveformInput = {
  readonly peaks: readonly number[]
  readonly progress: number
  readonly duration: number
  readonly relisten: readonly TimeInterval[]
}
