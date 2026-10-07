import type { AskResultFrame } from './AskResultFrame.ts'
import type { AskResultTiming } from './AskResultTiming.ts'

/** The status and server-side elapsed time a result frame reports, if any. */
export function parseAskResultFrame(data: string): AskResultTiming {
  const payload = JSON.parse(data) as AskResultFrame
  return {
    status: payload.data?.status ?? 'unknown',
    serverMs: payload.data?.elapsedMs,
  }
}
