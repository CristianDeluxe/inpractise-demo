/** Days are honest for a recent source and unreadable for an old one. */
export function evidenceAgeLabel(days: number): string {
  if (days === 0) return 'published today'
  if (days < 60) return `${String(days)} days old`
  return `${String(Math.round(days / 30))} months old`
}
