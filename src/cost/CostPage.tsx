import { LabNav } from '@/transcripts/components/LabNav'
import { LabResourceView } from '@/transcripts/components/LabResourceView'
import { useLabResource } from '@/transcripts/hooks/useLabResource'
import { CostComparison } from './CostComparison'
import { CostTable } from './CostTable'
import { loadCostRows } from './loadCostRows'

export function CostPage() {
  const resource = useLabResource(loadCostRows, null)
  return (
    <LabResourceView resource={resource} noun="the cost figures">
      {(rows) => (
        <main id="main-content" className="page-shell py-16">
          <LabNav />
          <h1 className="mt-6 text-4xl">Cleanup cost</h1>
          <p className="prose-measure mt-5 text-lg text-muted-foreground">
            How much human review each transcript needed after the AI pass.
            Reviewer time is estimated from decision timestamps: the gaps
            between consecutive decisions, ignoring any gap over 10 minutes. It
            is an estimate of active review, not a stopwatch reading.
          </p>
          <CostComparison rows={rows} />
          <CostTable rows={rows} />
        </main>
      )}
    </LabResourceView>
  )
}
