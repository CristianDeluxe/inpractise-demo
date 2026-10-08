import type { ReviewSummaryLineProps } from './ReviewSummaryLineProps'

/** One-line stand-in for the figure grid on phones, so the player stays on the first screen. */
export function ReviewSummaryLine({
  duration,
  relistenMinutes,
  edits,
}: ReviewSummaryLineProps) {
  const parts = [
    duration,
    `~${String(relistenMinutes)} min to re-listen`,
    edits === null ? 'no edits yet' : `${edits} edits`,
  ]
  return (
    <p className="mt-3 text-sm font-medium tabular-nums md:hidden">
      {parts.join(' · ')}
    </p>
  )
}
