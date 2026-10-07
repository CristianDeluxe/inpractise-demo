/** The JSON body the research endpoint returns: data on success, error on failure. */
export type ResearchResponsePayload = {
  data?: unknown
  error?: { code?: string; message?: string }
}
