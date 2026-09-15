import { formatCompanyName } from '@/components/formatters/formatCompanyName'
import { CompareRelationsView } from './CompareRelationsView'
import type { CompareResultViewProps } from './CompareResultViewProps'
import { CompareSideView } from './CompareSideView'
import { CompareUncoveredNotice } from './CompareUncoveredNotice'

export function CompareResultView({ comparison }: CompareResultViewProps) {
  return (
    <section aria-label="Cross-reference" className="mt-8">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <h2 className="font-sans text-xl">
          {formatCompanyName(comparison.company)} — {comparison.topic}
        </h2>
        <p className="text-xs text-muted-foreground">
          {comparison.mode === 'hybrid' ? 'Hybrid' : 'Lexical only'}
        </p>
      </div>
      {comparison.uncovered.length > 0 ? (
        <div className="mt-4 space-y-2">
          {comparison.uncovered.map((side) => (
            <CompareUncoveredNotice key={side} side={side} />
          ))}
        </div>
      ) : null}
      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <CompareSideView name="interviews" side={comparison.sides.interviews} />
        <CompareSideView name="filings" side={comparison.sides.filings} />
      </div>
      {comparison.relations.length > 0 ? (
        <CompareRelationsView
          relations={comparison.relations}
          sides={comparison.sides}
        />
      ) : null}
    </section>
  )
}
