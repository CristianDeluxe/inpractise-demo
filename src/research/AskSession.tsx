import { useResearch } from '@/research/hooks/useResearch'
import type { AskSessionProps } from './AskSessionProps'
import { AskSessionResults } from './AskSessionResults'
import { EvidenceInspector } from './EvidenceInspector'
import { InvestigationInspector } from './InvestigationInspector'
import { QuestionForm } from './QuestionForm'
import { QuestionSuggestions } from './QuestionSuggestions'

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
  const investigation =
    research.investigation.state.status === 'success'
      ? research.investigation.state.data.data
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
        <AskSessionResults research={research} />
      </div>
      {research.mode === 'investigate' ? (
        <InvestigationInspector
          answer={investigation}
          stages={research.investigationProgress.stages}
          pending={research.investigation.state.status === 'loading'}
        />
      ) : (
        <EvidenceInspector
          answer={answer}
          stages={research.progress.stages}
          pending={research.answer.state.status === 'loading'}
        />
      )}
    </div>
  )
}
