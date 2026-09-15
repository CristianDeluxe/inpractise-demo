import { monthNames } from './monthNames.mjs'

// "2026-09-13T19:59:17+02:00" reads "13 September 2026, 19:59" in the author's
// own zone; no conversion to the reader's clock.
export function commitDateLabel(isoDate) {
  const monthName = monthNames[Number(isoDate.slice(5, 7)) - 1] ?? ''
  return `${Number(isoDate.slice(8, 10))} ${monthName} ${isoDate.slice(0, 4)}, ${isoDate.slice(11, 16)}`
}
