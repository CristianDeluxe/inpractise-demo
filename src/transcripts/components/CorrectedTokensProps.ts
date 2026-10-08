export type CorrectedTokensProps = {
  readonly tokens: readonly string[]
  /** Same length as tokens; true marks a word the correction inserted. */
  readonly inserted: readonly boolean[]
}
