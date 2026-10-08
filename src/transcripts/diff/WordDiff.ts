/** Per-token change flags; the arrays line up with the diffed token arrays. */
export type WordDiff = {
  readonly rawChanged: readonly boolean[]
  readonly correctedChanged: readonly boolean[]
}
