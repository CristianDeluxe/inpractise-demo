/** The parts of an episode's correction.json the publisher reads. */
export type EpisodeCorrection = {
  readonly model: string
  readonly usage: {
    readonly inputTokens: number
    readonly outputTokens: number
  }
  readonly paragraphs: readonly { readonly edits: readonly unknown[] }[]
}
