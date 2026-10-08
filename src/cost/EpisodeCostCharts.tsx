import { aiCostChartRows } from './aiCostChartRows'
import { BasisTag } from './BasisTag'
import { BarChart } from './charts/BarChart'
import type { CostRowsProps } from './CostRowsProps'
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
        cost is USD 0. The second AI pass is priced from the tokens it used at
        the model&apos;s public list price; it ran on a subscription lane, so
        this is what the same tokens would cost through the API, not a bill.
        Reviewer time is estimated from decision timestamps.
      </p>
      <BarChart
        caption="AI cleanup API cost per audio hour, USD (estimated at list price)"
        rows={aiCostChartRows(rows)}
      />
      <BarChart
        caption="Reviewer minutes per audio hour (estimated from decision timestamps)"
        rows={reviewerChartRows(rows)}
      />
    </section>
  )
}
