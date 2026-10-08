import type { TranscriptWord } from '../contracts/TranscriptWord'

export type ConfidenceWordProps = {
  readonly word: TranscriptWord
  readonly onSeek: (seconds: number) => void
  /** Raw word that the correction replaced or removed. */
  readonly struck?: boolean
  readonly showFlags?: boolean
}
