/** Ask usage of one UTC day, summed over the organisation. */
export type UsageDay = {
  readonly day: string
  readonly requests: number
  readonly inputTokens: number
  readonly outputTokens: number
  readonly totalTokens: number
}
