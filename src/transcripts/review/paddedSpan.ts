import { replayPaddingSeconds } from './replayPaddingSeconds'
import type { TimeInterval } from './TimeInterval'

/** An edit's audio with a little context either side, never before zero. */
export function paddedSpan(span: TimeInterval): TimeInterval {
  return {
    start: Math.max(0, span.start - replayPaddingSeconds),
    end: span.end + replayPaddingSeconds,
  }
}
