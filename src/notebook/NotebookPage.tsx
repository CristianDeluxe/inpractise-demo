import { RequestFeedback } from '@/components/RequestFeedback'
import { ResponseMeta } from '@/components/ResponseMeta'
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
    <main
      id="main-content"
      className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8"
    >
      <p className="eyebrow text-muted-foreground">Research notebook</p>
      <h1 className="mt-3 font-sans text-3xl">Your saved citations</h1>
      <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
        A note keeps the passage identity, the question it answered and your own
        line. The quotation itself is re-read from the corpus each time this
        page opens, under your current access, so nothing here outlives what you
        may read.
      </p>
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
      {notebook.state.status === 'success' ? (
        <ResponseMeta {...notebook.state.data} />
      ) : null}
    </main>
  )
}
