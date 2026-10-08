import { PublicLayout } from '@/components/PublicLayout'
import { listTranscripts } from '../api/listTranscripts'
import { DisclosureNotice } from '../components/DisclosureNotice'
import { LabNav } from '../components/LabNav'
import { LabResourceView } from '../components/LabResourceView'
import { TranscriptTable } from '../components/TranscriptTable'
import { useLabResource } from '../hooks/useLabResource'
import { generalDisclosure } from '../review/generalDisclosure'

export function TranscriptListPage() {
  const resource = useLabResource(listTranscripts, null)
  return (
    <PublicLayout>
      <LabResourceView resource={resource} noun="the transcripts">
        {(items) => (
          <main id="main-content" className="page-shell py-16">
            <LabNav />
            <h1 className="mt-6 text-4xl">Transcript review</h1>
            <p className="prose-measure mt-5 text-lg text-muted-foreground">
              Speech recognition is unsure of about one word in twenty. Review
              only those spans instead of re-listening to the whole interview,
              accept or reject each proposed correction, and every decision
              becomes memory for the next transcript.
            </p>
            <DisclosureNotice text={generalDisclosure} />
            <TranscriptTable items={items} />
          </main>
        )}
      </LabResourceView>
    </PublicLayout>
  )
}
