/** What one transcript cost to clean, from what the lab recorded. */
export type CostRow = {
  readonly id: string
  readonly title: string
  readonly audioSeconds: number
  /** Local speech recognition; no API is called, so its API cost is zero. */
  readonly asrModel: string
  readonly asrSeconds: number
  /** Null until the second AI pass has run. */
  readonly correctionModel: string | null
  readonly inputTokens: number | null
  readonly outputTokens: number | null
  /** At the model's public list price; undefined without a pass or without a confirmed price. */
  readonly aiCostUsd: number | undefined
  readonly proposedEdits: number
  readonly decidedEdits: number
  /** Undefined when the decision timestamps cannot measure it. */
  readonly reviewerSeconds: number | undefined
  readonly minutesPerAudioHour: number | undefined
}
