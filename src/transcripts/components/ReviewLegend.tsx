import { ConfidenceLegend } from './ConfidenceLegend'
import { ReliabilityLegend } from './ReliabilityLegend'
import type { ReviewLegendProps } from './ReviewLegendProps'

export function ReviewLegend({ mode }: ReviewLegendProps) {
  return mode === 'final' ? <ReliabilityLegend /> : <ConfidenceLegend />
}
