import type { SpeakerRole } from '../contracts/SpeakerRole'
import type { SpeakerTurn } from '../contracts/SpeakerTurn'

/** The role speaking at a second: the last turn that started at or before it. */
export function roleAt(
  turns: readonly SpeakerTurn[],
  seconds: number,
): SpeakerRole | undefined {
  return (
    turns.findLast((turn) => turn.start <= seconds + 0.05)?.role ??
    turns[0]?.role
  )
}
