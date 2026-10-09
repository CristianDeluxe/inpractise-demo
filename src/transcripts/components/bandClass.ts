import type { ConfidenceBand } from '../contracts/ConfidenceBand'

/** A faint tint per band; the underline that tells the kinds apart without colour is added by `wordClassName`. */
export const bandClass: Record<ConfidenceBand, string> = {
  high: '',
  medium: 'bg-warning/40',
  low: 'bg-destructive/15',
}
