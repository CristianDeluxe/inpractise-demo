import type { ReportSegment } from './ReportSegment'

export type ReportParagraph = {
  readonly id: string
  readonly start: number
  /** The paragraph as plain text, pending edits applied. */
  readonly text: string
  /** The same text cut so pending wording can be told apart. */
  readonly segments: readonly ReportSegment[]
}
