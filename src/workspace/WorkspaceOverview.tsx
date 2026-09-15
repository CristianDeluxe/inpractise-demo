import { CompanyFilter } from './CompanyFilter'
import { CoverageOverview } from './CoverageOverview'
import { LibraryStatsRow } from './LibraryStatsRow'
import { RecentDocuments } from './RecentDocuments'
import type { WorkspaceOverviewProps } from './WorkspaceOverviewProps'

export function WorkspaceOverview({
  library,
  company,
  onChange,
}: WorkspaceOverviewProps) {
  return (
    <>
      <LibraryStatsRow library={library} company={company} />
      <CompanyFilter library={library} company={company} onChange={onChange} />
      <CoverageOverview library={library} company={company} />
      <RecentDocuments library={library} company={company} />
    </>
  )
}
