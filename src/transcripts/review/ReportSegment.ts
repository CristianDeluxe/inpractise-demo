/**
 * A run of report text. Pending marks wording from an edit nobody has
 * accepted yet; removed marks raw words such an edit would delete.
 */
export type ReportSegment = {
  readonly text: string
  readonly pending: boolean
  readonly removed: boolean
}
