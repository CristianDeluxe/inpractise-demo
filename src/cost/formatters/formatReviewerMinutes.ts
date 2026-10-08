/** Minutes to one decimal place, with the unit. */
export function formatReviewerMinutes(minutes: number): string {
  return `${minutes.toFixed(1)} min`
}
