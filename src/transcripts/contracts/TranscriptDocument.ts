import type { TranscriptParagraph } from './TranscriptParagraph'
import type { TranscriptSource } from './TranscriptSource'
import type { TranscriptStats } from './TranscriptStats'

/** First-pass machine transcript: work/transcripts/<id>/transcript.json */
export type TranscriptDocument = {
  readonly id: string
  readonly source: TranscriptSource
  readonly asrModel: string
  readonly transcribedAt: string
  readonly asrSeconds: number
  readonly paragraphs: readonly TranscriptParagraph[]
  readonly stats: TranscriptStats
}
