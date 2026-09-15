/**
 * Renders a stored timestamp as minutes in its own zone, without a locale or a
 * clock on this machine deciding what it says. The full value stays available
 * to the element that displays this.
 */
export function formatRecordedAt(recordedAt: string): string {
  const date = recordedAt.slice(0, 10)
  const time = recordedAt.slice(11, 16)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time))
    return recordedAt
  return /(?:Z|\+00:00)$/.test(recordedAt)
    ? `${date} ${time} UTC`
    : `${date} ${time}`
}
