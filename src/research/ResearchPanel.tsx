import { RequestFeedback } from '@/components/RequestFeedback'
import { ResponseMeta } from '@/components/ResponseMeta'
import { useResearch } from '@/research/hooks/useResearch'
import { AnswerView } from './AnswerView'
import { QuestionForm } from './QuestionForm'
import { QuestionSuggestions } from './QuestionSuggestions'
import type { ResearchPanelProps } from './ResearchPanelProps'
import { SearchView } from './SearchView'

export function ResearchPanel({ company }: ResearchPanelProps) {
  const research = useResearch(company)
  return (
    <section id="research" className="mt-12 border-t border-border pt-8">
      <h2 className="mb-5 font-sans text-2xl">Ask. Read. Verify.</h2>
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
          <ResponseMeta {...research.answer.state.data} />
        </>
      ) : null}
    </section>
  )
}
