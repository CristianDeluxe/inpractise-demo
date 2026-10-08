/** One step of an edit script; index points into the raw words, or the final words for an insert. */
export type DiffOp = {
  readonly kind: 'keep' | 'delete' | 'insert'
  readonly index: number
}
