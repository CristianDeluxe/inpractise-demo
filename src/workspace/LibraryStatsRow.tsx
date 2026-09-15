import type { LibraryPanelProps } from './LibraryPanelProps'
import { StatTile } from './StatTile'
import { summariseLibrary } from './summariseLibrary'

export function LibraryStatsRow({ library, company }: LibraryPanelProps) {
  const stats = summariseLibrary(library, company)
  return (
    <section className="mb-8">
      <h2 className="sr-only">Corpus at a glance</h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        <StatTile label="Documents" value={stats.documents} />
        <StatTile label="Passages" value={stats.passages} />
        <StatTile label="Companies" value={stats.companies} />
        <StatTile
          label="Filings"
          value={stats.filings}
          note="Public SEC sources"
        />
        <StatTile
          label="Interviews"
          value={stats.interviews}
          note="Synthetic sources"
        />
        <StatTile label="Latest revision" value={stats.latestPublished} />
      </div>
    </section>
  )
}
