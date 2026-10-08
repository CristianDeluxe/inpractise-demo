import { PublicLayout } from '@/components/PublicLayout'
import { Link } from '@tanstack/react-router'
import { listTranscripts } from '../api/listTranscripts'
import { DisclosureNotice } from '../components/DisclosureNotice'
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
            <p className="eyebrow text-muted-foreground">Lab</p>
            <h1 className="mt-3 text-4xl">Transcript review</h1>
            <p className="prose-measure mt-5 text-lg text-muted-foreground">
              Open an episode, look only at the spans the model was unsure
              about, and accept or reject each correction.{' '}
              <Link to="/lab/memory" className="underline underline-offset-4">
                See what the system has learned
              </Link>
              .
            </p>
            <DisclosureNotice text={generalDisclosure} />
            <TranscriptTable items={items} />
          </main>
        )}
      </LabResourceView>
    </PublicLayout>
  )
}
