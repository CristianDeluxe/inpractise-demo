export function formatPercent(part: number, whole: number) {
  if (whole <= 0) return '0%'
  const value = (part / whole) * 100
  return `${value >= 10 ? value.toFixed(0) : value.toFixed(1)}%`
}
