import { loadTranscriptBundle } from '../api/loadTranscriptBundle'
import { LabNav } from '../components/LabNav'
import { LabResourceView } from '../components/LabResourceView'
import { ReviewWorkspace } from '../components/ReviewWorkspace'
import { useLabResource } from '../hooks/useLabResource'
import { useTranscriptId } from '../hooks/useTranscriptId'

export function TranscriptReviewPage() {
  const id = useTranscriptId()
  const resource = useLabResource(loadTranscriptBundle, id)
  return (
    <LabResourceView resource={resource} noun="the transcript">
      {(bundle) => (
        <ReviewWorkspace key={id} bundle={bundle} nav={<LabNav />} />
      )}
    </LabResourceView>
  )
}
