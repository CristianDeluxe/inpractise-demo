import type { SpeakerTurn } from '../contracts/SpeakerTurn'
import type { SpeakerSpan } from './SpeakerSpan'

/** Merges back-to-back turns of the same role, so a pause inside an answer does not count as a new turn. */
export function speakerSpans(turns: readonly SpeakerTurn[]): SpeakerSpan[] {
  const spans: SpeakerSpan[] = []
  for (const turn of turns) {
    const seconds = Math.max(0, turn.end - turn.start)
    const last = spans.at(-1)
    if (last?.role === turn.role)
      spans[spans.length - 1] = {
        role: turn.role,
        seconds: last.seconds + seconds,
      }
    else spans.push({ role: turn.role, seconds })
  }
  return spans
}
