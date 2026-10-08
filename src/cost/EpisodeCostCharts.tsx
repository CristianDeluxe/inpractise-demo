import { BasisTag } from './BasisTag'
import { BarChart } from './charts/BarChart'
import type { CostRowsProps } from './CostRowsProps'
import { reliabilityChartRows } from './reliabilityChartRows'
import { reviewerChartRows } from './reviewerChartRows'

export function EpisodeCostCharts({ rows }: CostRowsProps) {
  return (
    <section aria-labelledby="episode-cost-heading" className="mt-12">
      <h2 id="episode-cost-heading" className="text-2xl">
        Transcript cleanup per episode
        <BasisTag basis="estimated" />
      </h2>
      <p className="prose-measure mt-3 text-muted-foreground">
        Speech recognition runs locally (Parakeet) and calls no API, so its API
        cost is USD 0. The AI cleanup pass runs on a subscription lane, not the
        paid API, so its marginal API cost is USD 0 with no per-token charge;
        its token counts below are as measured. Each episode&apos;s AI-final
        reliability is computed from the recorded words and edits. Spot-check
        time is optional and estimated from decision timestamps.
      </p>
      <BarChart
        caption="AI-final reliability per episode, % of words (computed)"
        rows={reliabilityChartRows(rows)}
      />
      <BarChart
        caption="Optional spot-check minutes per audio hour (estimated from decision timestamps)"
        rows={reviewerChartRows(rows)}
      />
    </section>
  )
}
