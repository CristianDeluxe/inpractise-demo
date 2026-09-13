import { RequestFeedback } from '@/components/RequestFeedback'
import { ResponseMeta } from '@/components/ResponseMeta'
import { ResearchPanel } from '@/research/ResearchPanel'
import { useResearchWorkspace } from '@/workspace/hooks/useResearchWorkspace'
import { CompanyFilter } from './CompanyFilter'
import { LibraryPanel } from './LibraryPanel'

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
        Browse authorized sources, search exact passages, or ask a standalone
        question. Each answer keeps its sources and limitations in view.
      </p>
      <RequestFeedback
        state={library.state}
        cancel={library.cancel}
        retry={() => {
          void library.run(undefined)
        }}
      />
      {library.state.status === 'success' ? (
        <>
          <CompanyFilter
            library={library.state.data.data}
            company={company}
            onChange={setCompany}
          />
          <LibraryPanel library={library.state.data.data} company={company} />
          <ResponseMeta {...library.state.data} />
        </>
      ) : null}
      <ResearchPanel key={company} company={company} />
    </main>
  )
}
