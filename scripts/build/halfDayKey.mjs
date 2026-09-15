// "2026-09-13T19:59:19+02:00" becomes "2026-09-13-pm": the calendar day in the
// author's own zone, split at noon.
export function halfDayKey(isoDate) {
  const day = isoDate.slice(0, 10)
  const hour = Number(isoDate.slice(11, 13))
  return `${day}-${hour < 12 ? 'am' : 'pm'}`
}
