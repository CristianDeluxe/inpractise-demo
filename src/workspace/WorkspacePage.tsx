import { RequestFeedback } from '@/components/RequestFeedback'
import { ResponseMeta } from '@/components/ResponseMeta'
import { useResearchWorkspace } from '@/workspace/hooks/useResearchWorkspace'
import { Link } from '@tanstack/react-router'
import { WorkspaceOverview } from './WorkspaceOverview'

export function WorkspacePage() {
  const { library, company, setCompany } = useResearchWorkspace()
  return (
    <main
      id="main-content"
      className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8"
    >
      <p className="eyebrow text-muted-foreground">Research workspace</p>
      <h1 className="mt-3 font-sans text-3xl">
        From a question to its evidence.
      </h1>
      <p className="mb-8 mt-3 max-w-2xl text-sm text-muted-foreground">
        These counts describe the corpus you are authorized to read, not the
        corpus that exists. Ask a question and every stage of the answer stays
        inspectable.
      </p>
      <Link to="/app/ask" className="action mb-8 inline-flex">
        Ask the corpus
      </Link>
      <RequestFeedback
        state={library.state}
        cancel={library.cancel}
        retry={() => {
          void library.run(undefined)
        }}
      />
      {library.state.status === 'success' ? (
        <>
          <WorkspaceOverview
            library={library.state.data.data}
            company={company}
            onChange={setCompany}
          />
          <ResponseMeta {...library.state.data} />
        </>
      ) : null}
    </main>
  )
}
