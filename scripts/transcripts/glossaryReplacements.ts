import type { GlossaryMatch } from './GlossaryMatch.ts'
import type { Replacement } from './Replacement.ts'

export function glossaryReplacements(
  matches: readonly GlossaryMatch[],
): Replacement[] {
  return matches.map((match) => ({
    start: match.start,
    end: match.end,
    text: match.entry.to,
  }))
}
