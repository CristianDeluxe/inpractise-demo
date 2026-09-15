/** The status and server-side elapsed time a result frame reports, if any. */
export function parseAskResultFrame(data: string): {
  status: string
  serverMs: number | undefined
} {
  const payload = JSON.parse(data) as {
    data?: { status?: string; elapsedMs?: number }
  }
  return {
    status: payload.data?.status ?? 'unknown',
    serverMs: payload.data?.elapsedMs,
  }
}
