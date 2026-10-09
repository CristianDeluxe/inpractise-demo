import type { SpeakerRole } from '../contracts/SpeakerRole'
import type { SpeakerTurn } from '../contracts/SpeakerTurn'

/** The episode's diarization turns and the public names of its two roles. */
export type SpeakerLabels = {
  readonly turns: readonly SpeakerTurn[]
  readonly names: Readonly<Record<SpeakerRole, string>>
}
