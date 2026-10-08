import { AccessContext } from '@/auth/AccessContext'
import { LabNav } from '@/transcripts/components/LabNav'
import { LabResourceView } from '@/transcripts/components/LabResourceView'
import { useLabResource } from '@/transcripts/hooks/useLabResource'
import { useContext } from 'react'
import { CostTable } from './CostTable'
import { EmbeddingSection } from './EmbeddingSection'
import { EpisodeCostCharts } from './EpisodeCostCharts'
import { loadCostData } from './loadCostData'
import { PriceSources } from './PriceSources'
import { UsageSection } from './UsageSection'

export function CostPage() {
  const isReviewer = useContext(AccessContext)?.role === 'reviewer'
  const resource = useLabResource(loadCostData, isReviewer)
  return (
    <LabResourceView resource={resource} noun="the cost figures">
      {(data) => (
        <main id="main-content" className="page-shell py-16">
          <LabNav />
          <h1 className="mt-6 text-4xl">Pipeline cost</h1>
          <p className="prose-measure mt-5 text-lg text-muted-foreground">
            What this pipeline itself used: tokens and API cost of the AI
            passes, local speech recognition at no API cost, and the reviewer
            minutes needed per audio hour. Every section says whether its
            numbers are measured or estimated.
          </p>
          <EpisodeCostCharts rows={data.rows} />
          <CostTable rows={data.rows} />
          <UsageSection usage={data.usage} />
          <EmbeddingSection tokens={data.embeddingTokens} />
          <PriceSources />
        </main>
      )}
    </LabResourceView>
  )
}
