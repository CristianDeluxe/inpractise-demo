/** The full envelope of one event stream: action and org beside the identity. */
export type StageStreamEnvelope = {
  action: string
  orgId: string
  buildId: string
  requestId: string
}
