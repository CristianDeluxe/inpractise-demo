import type { EvidenceVintageViewProps } from './EvidenceVintageViewProps'
import { evidenceAgeLabel } from './evidenceAgeLabel'

export function EvidenceVintageView({ vintage }: EvidenceVintageViewProps) {
  const yearDays = 365
  return (
    <p role="status" className="mt-4 text-sm text-muted-foreground">
      Evidence from {vintage.oldest} to {vintage.newest}. Oldest source{' '}
      {evidenceAgeLabel(vintage.oldestAgeDays)}.
      {vintage.newestAgeDays > yearDays
        ? ' Every source is over a year old; treat this as historical.'
        : null}
    </p>
  )
}
