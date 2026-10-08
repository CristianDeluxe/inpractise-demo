import type { ConfidenceBand } from './ConfidenceBand'
import type { WordFlag } from './WordFlag'

/** One word merged from Parakeet sub-word tokens; confidence is the minimum token confidence. */
export type TranscriptWord = {
  readonly text: string
  readonly start: number
  readonly end: number
  readonly confidence: number
  readonly band: ConfidenceBand
  readonly flags: readonly WordFlag[]
}
