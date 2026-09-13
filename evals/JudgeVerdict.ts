/** An independent model's reading of one answer against its own citations. */
export type JudgeVerdict = {
  grounded: boolean
  statusAppropriate: boolean
  reason: string
}
