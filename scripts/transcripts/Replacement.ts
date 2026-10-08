/** Replace text[start, end) with `text`. */
export type Replacement = {
  readonly start: number
  readonly end: number
  readonly text: string
}
