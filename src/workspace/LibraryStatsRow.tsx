import { formatPublishedDate } from '@/components/formatters/formatPublishedDate'
import type { LibraryPanelProps } from './LibraryPanelProps'
import { StatTile } from './StatTile'
import { summariseLibrary } from './summariseLibrary'

export function LibraryStatsRow({ library, company }: LibraryPanelProps) {
  const stats = summariseLibrary(library, company)
  return (
    <section className="mb-8">
      <h2 className="sr-only">Interviews at a glance</h2>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile label="Interviews" value={stats.interviews} />
        <StatTile label="Transcript excerpts" value={stats.passages} />
        <StatTile label="Companies" value={stats.companies} />
        <StatTile
          label="Latest publication"
          value={
            stats.latestPublished === undefined
              ? undefined
              : formatPublishedDate(stats.latestPublished)
          }
        />
      </div>
    </section>
  )
}
