/** One word of the AI-final text. score is in [0, 1]; start is the audio second it can be replayed from. */
export type ScoredWord = {
  readonly text: string
  readonly score: number
  readonly start: number
}
