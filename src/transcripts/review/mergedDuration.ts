import type { TimeInterval } from './TimeInterval'

/** Total length covered by the intervals, counting overlaps once. */
export function mergedDuration(intervals: readonly TimeInterval[]) {
  const sorted = [...intervals].sort((a, b) => a.start - b.start)
  let total = 0
  let current: TimeInterval | null = null
  for (const interval of sorted) {
    if (current && interval.start <= current.end) {
      current = {
        start: current.start,
        end: Math.max(current.end, interval.end),
      }
    } else {
      if (current) total += current.end - current.start
      current = interval
    }
  }
  return current ? total + current.end - current.start : total
}
