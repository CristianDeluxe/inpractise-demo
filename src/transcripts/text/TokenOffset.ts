/** A whitespace-delimited word, its match key and its character offsets in the source text. */
export type TokenOffset = {
  readonly key: string
  readonly start: number
  readonly end: number
}
