export type ApiErrorDetails = {
  retryable?: boolean
  status?: number | null
  requestId?: string | null
  serverCode?: string | null
}
