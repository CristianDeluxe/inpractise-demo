import { PublicLayout } from '@/components/PublicLayout'
import { loadTranscriptBundle } from '../api/loadTranscriptBundle'
import { LabResourceView } from '../components/LabResourceView'
import { ReviewWorkspace } from '../components/ReviewWorkspace'
import { useLabResource } from '../hooks/useLabResource'
import { useTranscriptId } from '../hooks/useTranscriptId'

export function TranscriptReviewPage() {
  const id = useTranscriptId()
  const resource = useLabResource(loadTranscriptBundle, id)
  return (
    <PublicLayout>
      <LabResourceView resource={resource} noun="the transcript">
        {(bundle) => <ReviewWorkspace key={id} bundle={bundle} />}
      </LabResourceView>
    </PublicLayout>
  )
}
