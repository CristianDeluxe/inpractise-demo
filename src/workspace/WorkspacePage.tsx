import { RequestFeedback } from '@/components/RequestFeedback'
import { ResponseMeta } from '@/components/ResponseMeta'
import { useLibrary } from '@/workspace/hooks/useLibrary'
import { CompanyGrid } from './CompanyGrid'

export function WorkspacePage() {
  const library = useLibrary()
  return (
    <main
      id="main-content"
      className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8"
    >
      <p className="eyebrow text-muted-foreground">Research workspace</p>
      <h1 className="mt-3 font-sans text-3xl">Start with a company.</h1>
      <p className="mb-8 mt-3 max-w-2xl text-sm text-muted-foreground">
        Each company below is one this account is authorized to read. Open its
        sources, or ask a standalone question scoped to it and follow every
        answer back to the passage it cites.
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
