import { RequestFeedback } from '@/components/RequestFeedback'
import { ResponseMeta } from '@/components/ResponseMeta'
import { useResearch } from '@/research/hooks/useResearch'
import { AnswerView } from './AnswerView'
import type { AskSessionProps } from './AskSessionProps'
import { EvidenceInspector } from './EvidenceInspector'
import { QuestionForm } from './QuestionForm'
import { QuestionSuggestions } from './QuestionSuggestions'
import { SearchView } from './SearchView'

/**
 * Mounted under a key of the company scope, so changing scope discards the
 * previous answer rather than leaving evidence from one scope beside a
 * question asked in another.
 */
export function AskSession({ company }: AskSessionProps) {
  const research = useResearch(company)
  const answer =
    research.answer.state.status === 'success'
      ? research.answer.state.data.data
      : undefined
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
      <div id="research" className="min-w-0">
        <QuestionForm research={research} />
        <QuestionSuggestions research={research} />
        <p className="text-xs text-muted-foreground">
          Cancelling clears the request display; server work and consumed
          allowance may continue.
        </p>
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
      </div>
      <EvidenceInspector
        answer={answer}
        stages={research.progress.stages}
        pending={research.answer.state.status === 'loading'}
      />
    </div>
  )
}
