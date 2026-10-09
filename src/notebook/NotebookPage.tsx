import { RequestFeedback } from '@/components/RequestFeedback'
import { WorkspacePage } from '@/workspace/WorkspacePage'
import { groupNotesByCompany } from './groupNotesByCompany'
import { useNotebook } from './hooks/useNotebook'
import { NotebookGroup } from './NotebookGroup'

export function NotebookPage() {
  const notebook = useNotebook()
  const groups =
    notebook.state.status === 'success'
      ? groupNotesByCompany(notebook.state.data.data.notes)
      : []
  return (
    <WorkspacePage
      eyebrow="Research"
      title="Notebook"
      intro="A note keeps the excerpt identity, the question it answered and your own line. The quotation itself is re-read from the transcript each time this page opens, under your current access, so nothing here outlives what you may read."
    >
      <RequestFeedback
        state={notebook.state}
        cancel={notebook.cancel}
        retry={notebook.retry}
      />
      {notebook.state.status === 'success' && groups.length === 0 ? (
        <p className="mt-6 text-sm">
          Nothing saved yet. Use Save to notebook beside any citation.
        </p>
      ) : null}
      {groups.map((group) => (
        <NotebookGroup
          key={group.company ?? ''}
          group={group}
          onChange={notebook.retry}
        />
      ))}
    </WorkspacePage>
  )
}
