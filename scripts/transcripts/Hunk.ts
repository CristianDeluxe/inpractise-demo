/** A maximal run of words that differ between a raw and a final transcript. */
export type Hunk = {
  readonly from: string
  readonly to: string
}
