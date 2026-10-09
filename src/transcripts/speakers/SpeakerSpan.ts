import type { SpeakerRole } from '../contracts/SpeakerRole'

/** One uninterrupted stretch by a speaker: adjacent turns of the same role merged. */
export type SpeakerSpan = {
  readonly role: SpeakerRole
  readonly seconds: number
}
