/**
 * Formats an offset in seconds as "mm:ss", or "h:mm:ss" from one hour on.
 */
export function sectionLabel(totalSeconds) {
  const whole = Math.floor(totalSeconds)
  const hours = Math.floor(whole / 3600)
  const minutes = Math.floor((whole % 3600) / 60)
  const seconds = String(whole % 60).padStart(2, '0')
  if (hours === 0) return `${String(minutes).padStart(2, '0')}:${seconds}`
  return `${hours}:${String(minutes).padStart(2, '0')}:${seconds}`
}
