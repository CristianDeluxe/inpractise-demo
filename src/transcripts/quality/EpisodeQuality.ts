/** One episode's measured agreement with independent recognisers; see docs/transcript-quality.md. */
export type EpisodeQuality = {
  /** Clean-verbatim word error rate of the raw first pass against Whisper large-v3. */
  readonly rawWer: number
  /** The same for the AI final. */
  readonly finalWer: number
  readonly edits: number
  readonly styleOnly: number
  /** Applied content edits by verdict of the three independent signals. */
  readonly confirmed: number
  readonly contradicted: number
  readonly contested: number
}
