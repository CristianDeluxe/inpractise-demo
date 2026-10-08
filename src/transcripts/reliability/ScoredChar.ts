/** One visible character of the final text with the reliability of the word it belongs to. */
export type ScoredChar = {
  readonly score: number
  /** Index of the raw ASR word whose audio this character comes from. */
  readonly wordIndex: number
}
