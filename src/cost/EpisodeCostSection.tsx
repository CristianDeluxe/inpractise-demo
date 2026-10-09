import { BasisTag } from './BasisTag'
import type { CostRowsProps } from './CostRowsProps'
import { CostTable } from './CostTable'
import { CostTableNotes } from './CostTableNotes'
import { SpotCheckRate } from './SpotCheckRate'

export function EpisodeCostSection({ rows }: CostRowsProps) {
  return (
    <section aria-labelledby="episode-cost-heading">
      <h2 id="episode-cost-heading" className="text-2xl">
        Transcript cleanup per episode
        <BasisTag basis="estimated" />
      </h2>
      <div className="mt-4">
        <CostTable rows={rows} />
      </div>
      <CostTableNotes />
      <SpotCheckRate rows={rows} />
    </section>
  )
}
