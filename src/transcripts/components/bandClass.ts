import type { ConfidenceBand } from '../contracts/ConfidenceBand'

export const bandClass: Record<ConfidenceBand, string> = {
  high: '',
  medium: 'bg-warning',
  low: 'bg-destructive/15 font-medium',
}
