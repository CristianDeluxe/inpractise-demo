import { WorkspacePage } from '@/workspace/WorkspacePage'
import { loadMemoryOverview } from '../api/loadMemoryOverview'
import { DisclosureNotice } from '../components/DisclosureNotice'
import { GlossaryTable } from '../components/GlossaryTable'
import { LabResourceView } from '../components/LabResourceView'
import { MemoryExplainer } from '../components/MemoryExplainer'
import { useLabResource } from '../hooks/useLabResource'
import { generalDisclosure } from '../review/generalDisclosure'

export function MemoryPage() {
  const resource = useLabResource(loadMemoryOverview, null)
  return (
    <LabResourceView resource={resource} noun="the memory">
      {(memory) => (
        <WorkspacePage
          eyebrow="Production"
          title="Learned memory"
          intro={`Glossary entries: ${String(memory.glossary.length)}. Stored examples: ${String(memory.examples)}.`}
          note={<DisclosureNotice text={generalDisclosure} />}
        >
          <h2 className="text-2xl">How it is applied</h2>
          <MemoryExplainer />
          <h2 className="mt-12 text-2xl">Glossary</h2>
          <GlossaryTable entries={memory.glossary} />
        </WorkspacePage>
      )}
    </LabResourceView>
  )
}
