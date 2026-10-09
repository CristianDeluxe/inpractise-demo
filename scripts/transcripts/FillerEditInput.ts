import type { CharRange } from './CharRange.ts'
import type { FillerRun } from './FillerRun.ts'

export type FillerEditInput = {
  readonly paragraphId: string
  readonly words: readonly string[]
  readonly run: FillerRun
  /** Text already claimed by other edits; a filler edit never overlaps it. */
  readonly taken: readonly CharRange[]
}
