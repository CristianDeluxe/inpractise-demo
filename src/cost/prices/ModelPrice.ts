/** List price of one model, with where and when it was read. */
export type ModelPrice = {
  /** Base model id; a dated snapshot such as `<id>-2025-04-14` is billed at the same rate. */
  readonly modelId: string
  readonly inputUsdPerMillion: number
  /** Zero for models that only read text, such as embeddings. */
  readonly outputUsdPerMillion: number
  readonly sourceUrl: string
  /** ISO date the official page was read. */
  readonly fetchedOn: string
}
