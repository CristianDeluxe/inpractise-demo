import { RequestFeedback } from '@/components/RequestFeedback'
import { ResponseMeta } from '@/components/ResponseMeta'
import { useInspection } from '@/inspection/hooks/useInspection'
import { useLibrary } from '@/workspace/hooks/useLibrary'
import { AuthorizedLibrary } from './AuthorizedLibrary'
import { CorpusCounts } from './CorpusCounts'
import { EvaluationReportNotice } from './EvaluationReportNotice'
import { RecentRequests } from './RecentRequests'

export function InspectionPage() {
  const request = useInspection()
  const library = useLibrary()
  return (
    <main id="main-content" className="mx-auto max-w-6xl px-5 py-10">
      <p className="eyebrow text-muted-foreground">Reviewer diagnostics</p>
      <h1 className="mt-3 font-sans text-3xl">Inspect the evidence system.</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Read-only counts for the current reviewer’s authorized corpus. Revisions
        and passages may include retained history.
      </p>
      <RequestFeedback
        state={request.state}
        cancel={request.cancel}
        retry={() => {
          void request.run(undefined)
        }}
      />
      {request.state.status === 'success' ? (
        <>
          <CorpusCounts corpus={request.state.data.data.corpus} />
          <RecentRequests requests={request.state.data.data.recentRequests} />
          <EvaluationReportNotice
            diagnosis={request.state.data.data.corpus.diagnosis}
          />
          <ResponseMeta {...request.state.data} />
        </>
      ) : null}
      <RequestFeedback
        state={library.state}
        cancel={library.cancel}
        retry={() => {
          void library.run(undefined)
        }}
      />
      {library.state.status === 'success' ? (
        <AuthorizedLibrary library={library.state.data.data} />
      ) : null}
    </main>
  )
}
