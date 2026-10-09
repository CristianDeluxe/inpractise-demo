/** An edit's raw text and, when recorded, where it sits in the paragraph. */
export type PositionedText = {
  readonly from: string
  readonly at?: readonly number[]
}
