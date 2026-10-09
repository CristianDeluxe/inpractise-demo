import { AccessContext } from '@/auth/AccessContext'
import { DisclosureNotice } from '@/transcripts/components/DisclosureNotice'
import { LabResourceView } from '@/transcripts/components/LabResourceView'
import { useLabResource } from '@/transcripts/hooks/useLabResource'
import { generalDisclosure } from '@/transcripts/review/generalDisclosure'
import { WorkspacePage } from '@/workspace/WorkspacePage'
import { useContext } from 'react'
import { EmbeddingSection } from './EmbeddingSection'
import { EpisodeCostSection } from './EpisodeCostSection'
import { loadCostData } from './loadCostData'
import { PriceSources } from './PriceSources'
import { UsageSection } from './UsageSection'

export function CostPage() {
  const isReviewer = useContext(AccessContext)?.role === 'reviewer'
  const resource = useLabResource(loadCostData, isReviewer)
  return (
    <LabResourceView resource={resource} noun="the cost figures">
      {(data) => (
        <WorkspacePage
          eyebrow="Production"
          title="Pipeline cost"
          intro="What this pipeline itself used: tokens and API cost of the AI passes, local speech recognition at no API cost, and the reviewer minutes needed per audio hour. Every section says whether its numbers are measured or estimated."
          note={<DisclosureNotice text={generalDisclosure} />}
        >
          <EpisodeCostSection rows={data.rows} />
          <UsageSection usage={data.usage} />
          <EmbeddingSection tokens={data.embeddingTokens} />
          <PriceSources />
        </WorkspacePage>
      )}
    </LabResourceView>
  )
}
