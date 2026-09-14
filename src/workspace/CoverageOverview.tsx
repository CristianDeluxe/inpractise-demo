import { aggregateCompanyCoverage } from './aggregateCompanyCoverage'
import { CompanyDepth } from './CompanyDepth'
import { CoverageChart } from './CoverageChart'
import type { LibraryPanelProps } from './LibraryPanelProps'

export function CoverageOverview({ library, company }: LibraryPanelProps) {
  const companies = aggregateCompanyCoverage(library, company)
  const maximum = Math.max(
    0,
    ...companies.flatMap((item) =>
      item.passages === undefined ? [] : [item.passages],
    ),
  )
  return (
    <div className="mb-8 grid gap-x-8 border-y border-border lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
      <CoverageChart companies={companies} maximum={maximum} />
      <CompanyDepth companies={companies} maximum={maximum} />
    </div>
  )
}
