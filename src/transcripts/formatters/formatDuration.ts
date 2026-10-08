export function formatDuration(totalSeconds: number) {
  const minutes = Math.round(totalSeconds / 60)
  const hours = Math.floor(minutes / 60)
  return hours > 0
    ? `${String(hours)} h ${String(minutes % 60)} min`
    : `${String(minutes)} min`
}
