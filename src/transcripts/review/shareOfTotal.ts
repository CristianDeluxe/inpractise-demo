/** CSS width for a part of a total, as a percentage string. */
export function shareOfTotal(part: number, total: number) {
  return `${String(total === 0 ? 0 : (part / total) * 100)}%`
}
