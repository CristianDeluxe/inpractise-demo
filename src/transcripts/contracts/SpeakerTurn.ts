import type { SpeakerRole } from './SpeakerRole'

/** One stretch of audio attributed to a speaker, in seconds. */
export type SpeakerTurn = {
  readonly role: SpeakerRole
  readonly start: number
  readonly end: number
}
