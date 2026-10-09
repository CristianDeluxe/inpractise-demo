import type { CharRange } from './CharRange.ts'

export function rangesOverlap(
  range: CharRange,
  others: readonly CharRange[],
): boolean {
  return others.some(
    (other) => range.start < other.end && other.start < range.end,
  )
}
