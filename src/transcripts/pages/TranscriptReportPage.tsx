import { loadTranscriptBundle } from '../api/loadTranscriptBundle'
import { LabResourceView } from '../components/LabResourceView'
import { ReportView } from '../components/ReportView'
import { useLabResource } from '../hooks/useLabResource'
import { useTranscriptId } from '../hooks/useTranscriptId'

export function TranscriptReportPage() {
  const id = useTranscriptId()
  const resource = useLabResource(loadTranscriptBundle, id)
  return (
    <LabResourceView resource={resource} noun="the report">
      {(bundle) => <ReportView key={id} bundle={bundle} />}
    </LabResourceView>
  )
}
