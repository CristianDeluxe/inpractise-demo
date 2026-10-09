import type { SpeakerRole } from '../contracts/SpeakerRole'

/** Each speaker's name has its own colour, so turns are told apart at a glance. */
export function speakerTextClass(role: SpeakerRole | undefined) {
  if (role === 'host') return 'text-sky-700'
  if (role === 'guest') return 'text-violet-700'
  return 'text-foreground/80'
}
