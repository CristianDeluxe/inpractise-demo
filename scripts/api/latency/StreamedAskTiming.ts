export type StreamedAskTiming = {
  /** Wall-clock time until the first stage frame arrived. */
  firstPhaseMs: number
  /** Wall-clock time until the result frame arrived. */
  answerMs: number
  /** Server-side elapsed time reported by the result, when the build sends it. */
  serverMs: number | undefined
  status: string
}
