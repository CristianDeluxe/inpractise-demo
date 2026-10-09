import { WorkspacePage } from '@/workspace/WorkspacePage'
import { listTranscripts } from '../api/listTranscripts'
import { DisclosureNotice } from '../components/DisclosureNotice'
import { LabResourceView } from '../components/LabResourceView'
import { TranscriptTable } from '../components/TranscriptTable'
import { useLabResource } from '../hooks/useLabResource'
import { generalDisclosure } from '../review/generalDisclosure'

export function TranscriptListPage() {
  const resource = useLabResource(listTranscripts, null)
  return (
    <LabResourceView resource={resource} noun="the transcripts">
      {(items) => (
        <WorkspacePage
          eyebrow="Production"
          title="Transcripts"
          intro="The AI-corrected transcript is the final version. Each one carries a reliability score, and a person can optionally spot-check the few words it is least sure of. Anything a person confirms is kept as memory for the next transcript."
          note={<DisclosureNotice text={generalDisclosure} />}
        >
          <TranscriptTable items={items} />
        </WorkspacePage>
      )}
    </LabResourceView>
  )
}
