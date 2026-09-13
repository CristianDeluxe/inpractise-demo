import { RequestFeedback } from '@/components/RequestFeedback'
import { ResponseMeta } from '@/components/ResponseMeta'
import { useInspection } from '@/inspection/hooks/useInspection'
import { CorpusCounts } from './CorpusCounts'

export function InspectionPage() {
  const request = useInspection()
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
          <section className="rounded-lg border border-border bg-card p-6">
            <h2 className="font-sans text-xl">No reviewed evaluation report</h2>
            <p className="mt-4 text-sm text-muted-foreground">
              No report is connected to this endpoint. Diagnosis:{' '}
              {request.state.data.data.corpus.diagnosis}. These counts do not
              measure answer quality.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Candidate recall and context selection are separate measurements.
              An induced retrieval miss must remain a failed diagnostic; an
              unreviewed question is not a measured correct refusal.
            </p>
          </section>
          <ResponseMeta {...request.state.data} />
        </>
      ) : null}
    </main>
  )
}
