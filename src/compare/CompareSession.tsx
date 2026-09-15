import { RequestFeedback } from '@/components/RequestFeedback'
import { ResponseMeta } from '@/components/ResponseMeta'
import { CompareForm } from './CompareForm'
import { CompareResultView } from './CompareResultView'
import type { CompareSessionProps } from './CompareSessionProps'
import { CompareStageTrail } from './CompareStageTrail'
import { useCompare } from './hooks/useCompare'

/**
 * Mounted under a key of the company scope, so changing scope discards the
 * previous verdict rather than leaving evidence from one company beside a
 * topic compared for another.
 */
export function CompareSession({ company }: CompareSessionProps) {
  const compare = useCompare(company)
  return (
    <div>
      <CompareForm compare={compare} />
      <p className="mt-3 text-xs text-muted-foreground">
        Cancelling clears the request display; server work and consumed
        allowance may continue.
      </p>
      <RequestFeedback
        state={compare.request.state}
        cancel={compare.request.cancel}
        retry={compare.request.retry}
      />
      <CompareStageTrail
        stages={compare.progress.stages}
        pending={compare.request.state.status === 'loading'}
      />
      {compare.request.state.status === 'success' ? (
        <>
          <CompareResultView comparison={compare.request.state.data.data} />
          <ResponseMeta {...compare.request.state.data} />
        </>
      ) : null}
    </div>
  )
}
