import { RequestFeedback } from '@/components/RequestFeedback'
import { ResponseMeta } from '@/components/ResponseMeta'
import { useParams } from '@tanstack/react-router'
import { z } from 'zod'
import { useProvenance } from './hooks/useProvenance'
import { RevisionCurrency } from './RevisionCurrency'

export function ProvenancePage() {
  const { requestId } = z
    .object({ requestId: z.string().min(1) })
    .parse(useParams({ strict: false }))
  const request = useProvenance(requestId)
  return (
    <main id="main-content" className="mx-auto max-w-4xl px-5 py-10 md:px-10">
      <p className="eyebrow text-muted-foreground">Reopen this answer</p>
      <h1 className="mt-3 font-sans text-3xl">
        Is the evidence still current?
      </h1>
      <p className="mt-4 text-sm text-muted-foreground">
        This reopens one of your own answers by request id and checks each
        quoted revision against the corpus as it stands today.
      </p>
      <RequestFeedback
        state={request.state}
        cancel={request.cancel}
        retry={() => {
          void request.run({ action: 'provenance', requestId })
        }}
      />
      {request.state.status === 'success' ? (
        <>
          <RevisionCurrency revisions={request.state.data.data.revisions} />
          <ResponseMeta {...request.state.data} />
        </>
      ) : null}
    </main>
  )
}
