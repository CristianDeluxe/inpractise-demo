/** A whitespace-separated token and its offset in the text it was cut from. */
export type TextToken = {
  readonly text: string
  readonly at: number
}
