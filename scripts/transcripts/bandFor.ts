import type { ConfidenceBand } from '@/transcripts/contracts/ConfidenceBand.ts'
import { confidenceThresholds } from './confidenceThresholds.ts'

export function bandFor(confidence: number): ConfidenceBand {
  if (confidence < confidenceThresholds.low) return 'low'
  if (confidence < confidenceThresholds.medium) return 'medium'
  return 'high'
}
