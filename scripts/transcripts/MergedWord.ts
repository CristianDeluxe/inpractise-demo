/** A word merged from sub-word tokens, before banding and flagging. */
export type MergedWord = {
  readonly text: string
  readonly start: number
  readonly end: number
  readonly confidence: number
  readonly sentenceStart: boolean
}
