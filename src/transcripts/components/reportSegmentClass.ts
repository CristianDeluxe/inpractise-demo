import type { ReportSegment } from '../review/ReportSegment'

/** Unreviewed wording reads as provisional on screen and on paper. */
export function reportSegmentClass(segment: ReportSegment) {
  if (!segment.pending) return undefined
  const mark = segment.removed
    ? 'line-through decoration-2'
    : 'underline decoration-dotted decoration-2 underline-offset-4'
  return `text-muted-foreground ${mark} print:text-black`
}
