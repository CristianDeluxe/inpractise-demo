import type { SpeakerRole } from '../contracts/SpeakerRole'
import type { SpeakerLabels } from './SpeakerLabels'
import type { SpeakerShare } from './SpeakerShare'
import { speakerSpans } from './speakerSpans'

/** Speaking time, turn count and longest uninterrupted stretch per speaker, largest share first. */
export function speakerShares(labels: SpeakerLabels): SpeakerShare[] {
  const spans = speakerSpans(labels.turns)
  const total = spans.reduce((sum, span) => sum + span.seconds, 0)
  const roles: SpeakerRole[] = ['host', 'guest']
  return roles
    .map((role) => {
      const own = spans.filter((span) => span.role === role)
      const seconds = own.reduce((sum, span) => sum + span.seconds, 0)
      return {
        role,
        name: labels.names[role],
        seconds,
        share: total === 0 ? 0 : seconds / total,
        turns: own.length,
        longestSeconds: Math.max(0, ...own.map((span) => span.seconds)),
      }
    })
    .sort((a, b) => b.seconds - a.seconds)
}
