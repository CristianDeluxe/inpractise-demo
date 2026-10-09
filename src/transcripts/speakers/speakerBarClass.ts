import type { SpeakerRole } from '../contracts/SpeakerRole'

/** The talk-time bar in the speaker's name colour. */
export function speakerBarClass(role: SpeakerRole) {
  return role === 'host' ? 'bg-sky-600' : 'bg-violet-600'
}
