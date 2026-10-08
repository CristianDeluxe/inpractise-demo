/** Where the first mark of an edit sits in the viewport. */
export type MarkRect = {
  readonly top: number
  readonly bottom: number
  readonly left: number
  /** Right edge of the paragraph the mark is in: the margin bar sits past it. */
  readonly columnRight: number
}
