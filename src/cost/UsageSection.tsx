import { BasisTag } from './BasisTag'
import type { UsageSectionProps } from './UsageSectionProps'
import { BarChart } from './charts/BarChart'
import { usageChartRows } from './usageChartRows'

export function UsageSection({ usage }: UsageSectionProps) {
  return (
    <section aria-labelledby="ask-usage-heading" className="mt-12">
      <h2 id="ask-usage-heading" className="text-2xl">
        Ask usage per day
        <BasisTag basis="measured" />
      </h2>
      {usage === null ? (
        <p className="prose-measure mt-3 text-muted-foreground">
          Daily token use of Ask is shown to reviewers only, because it sums
          every colleague&apos;s requests. Reviewer access is needed to see it.
        </p>
      ) : (
        <>
          <p className="prose-measure mt-3 text-muted-foreground">
            Tokens and request counts are read from the usage ledger and summed
            over your organisation by UTC day. The USD figure is estimated: the
            ledger does not record the model, so tokens are priced at the answer
            model&apos;s list price.
          </p>
          {usage.length === 0 ? (
            <p className="mt-6 text-muted-foreground">
              No Ask requests have been recorded yet.
            </p>
          ) : (
            <BarChart
              caption="Tokens per day"
              rows={usageChartRows(usage)}
              legend={[
                { label: 'Input tokens', tone: 'primary' },
                { label: 'Output tokens', tone: 'steel' },
              ]}
            />
          )}
        </>
      )}
    </section>
  )
}
