import type { ConfidenceBand } from '../contracts/ConfidenceBand'

export const confidenceByBand: Record<ConfidenceBand, number> = {
  high: 0.97,
  medium: 0.7,
  low: 0.31,
}
