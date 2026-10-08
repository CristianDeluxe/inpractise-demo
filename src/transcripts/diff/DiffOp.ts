/** One step of a word diff: a token kept, removed from the left or added on the right. */
export type DiffOp = {
  readonly kind: 'equal' | 'removed' | 'added'
  readonly text: string
}
