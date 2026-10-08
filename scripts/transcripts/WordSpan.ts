/** A whitespace-delimited word and its character offsets in the source text. */
export type WordSpan = {
  readonly key: string
  readonly start: number
  readonly end: number
}
