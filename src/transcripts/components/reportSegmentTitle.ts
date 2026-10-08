import type { ReportSegment } from '../review/ReportSegment'

export function reportSegmentTitle(segment: ReportSegment) {
  if (!segment.pending) return undefined
  return segment.removed ? 'Pending removal' : 'Pending review'
}
