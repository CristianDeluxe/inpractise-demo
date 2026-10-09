import type { ConfidenceBand } from '../contracts/ConfidenceBand'

/** Dotted for a flagged word, dashed for a medium one, wavy for a low one: the kind survives without colour. */
export function underlineClass(band: ConfidenceBand, flagged: boolean): string {
  if (flagged) return 'underline decoration-dotted'
  if (band === 'medium') return 'underline decoration-dashed'
  if (band === 'low') return 'underline decoration-wavy'
  return ''
}
