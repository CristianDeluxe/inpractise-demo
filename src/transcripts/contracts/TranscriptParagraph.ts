import type { TranscriptWord } from './TranscriptWord'

/** A run of sentences split on long pauses. IDs are stable: p0001, p0002, ... */
export type TranscriptParagraph = {
  readonly id: string
  readonly start: number
  readonly end: number
  readonly words: readonly TranscriptWord[]
}
