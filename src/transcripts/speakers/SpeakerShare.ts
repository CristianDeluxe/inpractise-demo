import type { SpeakerRole } from '../contracts/SpeakerRole'

/** How much of the episode one speaker holds, from the diarization turns. */
export type SpeakerShare = {
  readonly role: SpeakerRole
  readonly name: string
  readonly seconds: number
  /** Fraction of all attributed speech, in [0, 1]. */
  readonly share: number
  readonly turns: number
  readonly longestSeconds: number
}
