/** One row of the usage_summary() function; bigint columns arrive as numbers. */
export type UsageRow = {
  readonly day: string
  readonly request_count: number
  readonly input_tokens: number
  readonly output_tokens: number
  readonly tokens_total: number
}
