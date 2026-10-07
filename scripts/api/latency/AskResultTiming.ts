/** The status and server-side elapsed time a result frame reports. */
export type AskResultTiming = {
  status: string
  serverMs: number | undefined
}
