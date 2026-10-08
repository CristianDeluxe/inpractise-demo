/** What one transcript cost to clean, from what the lab API recorded. */
export type CostRow = {
  readonly id: string
  readonly title: string
  readonly audioSeconds: number
  readonly proposedEdits: number
  readonly decidedEdits: number
  /** Undefined when the decision timestamps cannot measure it. */
  readonly reviewerSeconds: number | undefined
  readonly minutesPerAudioHour: number | undefined
}
