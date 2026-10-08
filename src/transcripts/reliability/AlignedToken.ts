/**
 * One step of the word alignment of an edit's `from` and `to`. leftIndex is the
 * `from` token an equal or removed step consumes, and null for an added one.
 */
export type AlignedToken = {
  readonly kind: 'equal' | 'removed' | 'added'
  readonly text: string
  readonly leftIndex: number | null
}
