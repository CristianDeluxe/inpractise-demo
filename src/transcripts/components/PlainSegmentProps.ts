import type { TranscriptWord } from '../contracts/TranscriptWord'

export type PlainSegmentProps = {
  readonly text: string
  /** Where the segment starts in the space-joined raw text of its words. */
  readonly offset: number
  readonly words: ReadonlyMap<number, TranscriptWord>
  readonly onSeek: (seconds: number) => void
}
