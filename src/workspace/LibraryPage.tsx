import { RequestFeedback } from '@/components/RequestFeedback'
import { ResponseMeta } from '@/components/ResponseMeta'
import { useResearchWorkspace } from '@/workspace/hooks/useResearchWorkspace'
import { CompanyFilter } from './CompanyFilter'
import { LibraryPanel } from './LibraryPanel'

export function LibraryPage() {
  const { library, company, setCompany } = useResearchWorkspace()
  return (
    <main
      id="main-content"
      className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8"
    >
      <p className="eyebrow text-muted-foreground">Source library</p>
      <h1 className="mt-3 font-sans text-3xl">Every document you may read.</h1>
      <p className="mb-8 mt-3 max-w-2xl text-sm text-muted-foreground">
        The database decides what appears here. A document you are not
        authorized to read is absent, not hidden.
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
    </main>
  )
}
