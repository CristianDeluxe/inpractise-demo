/** The payload of a streamed ask result frame. */
export type AskResultFrame = {
  data?: { status?: string; elapsedMs?: number }
}
