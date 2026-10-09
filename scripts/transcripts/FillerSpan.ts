/** Words first..last (inclusive) of a paragraph rewritten as `to`. */
export type FillerSpan = {
  readonly first: number
  readonly last: number
  readonly to: string
}
