export type ReviewSummaryLineProps = {
  readonly duration: string
  readonly relistenMinutes: number
  /** Edits proposed, or null before a second pass has run. */
  readonly edits: string | null
}
