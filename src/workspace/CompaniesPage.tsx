import { RequestFeedback } from '@/components/RequestFeedback'
import { ResponseMeta } from '@/components/ResponseMeta'
import { useInterviewLibrary } from '@/workspace/hooks/useInterviewLibrary'
import { CompanyGrid } from './CompanyGrid'

export function CompaniesPage() {
  const library = useInterviewLibrary()
  return (
    <main
      id="main-content"
      className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8"
    >
      <p className="eyebrow text-muted-foreground">Research</p>
      <h1 className="mt-3 font-sans text-3xl">Companies</h1>
      <p className="mb-8 mt-3 max-w-2xl text-sm text-muted-foreground">
        Each company below has at least one interview this account is authorized
        to read. Ask a question scoped to it, or open its interviews.
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
          <CompanyGrid library={library.state.data.data} />
          <ResponseMeta {...library.state.data} />
        </>
      ) : null}
    </main>
  )
}
