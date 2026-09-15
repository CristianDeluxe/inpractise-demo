import { RequestFeedback } from '@/components/RequestFeedback'
import { ResponseMeta } from '@/components/ResponseMeta'
import { AnswerView } from './AnswerView'
import type { AskSessionResultsProps } from './AskSessionResultsProps'
import { InvestigationAnswerView } from './InvestigationAnswerView'
import { SearchView } from './SearchView'

/** The three request states a question can settle into, each with its own
 * feedback and, on success, its own view of what came back. */
export function AskSessionResults({ research }: AskSessionResultsProps) {
  return (
    <>
      <RequestFeedback
        state={research.search.state}
        cancel={research.search.cancel}
        retry={research.search.retry}
      />
      <RequestFeedback
        state={research.answer.state}
        cancel={research.answer.cancel}
        retry={research.answer.retry}
      />
      <RequestFeedback
        state={research.investigation.state}
        cancel={research.investigation.cancel}
        retry={research.investigation.retry}
      />
      {research.search.state.status === 'success' ? (
        <>
          <SearchView result={research.search.state.data.data} />
          <ResponseMeta {...research.search.state.data} />
        </>
      ) : null}
      {research.answer.state.status === 'success' ? (
        <>
          <AnswerView answer={research.answer.state.data.data} />
          <ResponseMeta
            {...research.answer.state.data}
            stages={research.progress.stages}
          />
        </>
      ) : null}
      {research.investigation.state.status === 'success' ? (
        <>
          <InvestigationAnswerView
            answer={research.investigation.state.data.data}
          />
          <ResponseMeta {...research.investigation.state.data} />
        </>
      ) : null}
    </>
  )
}
