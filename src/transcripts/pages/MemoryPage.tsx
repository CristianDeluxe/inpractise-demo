import { loadMemoryOverview } from '../api/loadMemoryOverview'
import { DisclosureNotice } from '../components/DisclosureNotice'
import { GlossaryTable } from '../components/GlossaryTable'
import { LabNav } from '../components/LabNav'
import { LabResourceView } from '../components/LabResourceView'
import { MemoryExplainer } from '../components/MemoryExplainer'
import { useLabResource } from '../hooks/useLabResource'
import { generalDisclosure } from '../review/generalDisclosure'

export function MemoryPage() {
  const resource = useLabResource(loadMemoryOverview, null)
  return (
    <LabResourceView resource={resource} noun="the memory">
      {(memory) => (
        <main id="main-content" className="page-shell py-16">
          <LabNav />
          <h1 className="mt-6 text-4xl">Learned memory</h1>
          <p className="prose-measure mt-5 text-lg text-muted-foreground">
            Glossary entries: {String(memory.glossary.length)}. Stored examples:{' '}
            {String(memory.examples)}.
          </p>
          <DisclosureNotice text={generalDisclosure} />
          <h2 className="mt-12 text-2xl">How it is applied</h2>
          <MemoryExplainer />
          <h2 className="mt-12 text-2xl">Glossary</h2>
          <GlossaryTable entries={memory.glossary} />
        </main>
      )}
    </LabResourceView>
  )
}
