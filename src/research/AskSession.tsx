import { useResearch } from '@/research/hooks/useResearch'
import { AnswerProvenance } from './AnswerProvenance'
import type { AskSessionProps } from './AskSessionProps'
import { AskSessionResults } from './AskSessionResults'
import { QuestionForm } from './QuestionForm'
import { QuestionSuggestions } from './QuestionSuggestions'

/**
 * Mounted under a key of the company scope, so changing scope discards the
 * previous answer rather than leaving evidence from one scope beside a
 * question asked in another.
 */
export function AskSession({ company }: AskSessionProps) {
  const research = useResearch(company)
  return (
    <div
      id="research"
      className="min-w-0 xl:grid xl:grid-cols-[minmax(0,1fr)_28rem] xl:items-start xl:gap-10"
    >
      <div className="min-w-0">
        <QuestionForm research={research} />
        <QuestionSuggestions research={research} />
        <p className="text-xs text-muted-foreground">
          Cancelling clears the request display; server work and consumed
          allowance may continue.
        </p>
        <AskSessionResults research={research} />
      </div>
      <div className="min-w-0 xl:sticky xl:top-6 xl:max-h-[calc(100dvh-3rem)] xl:overflow-y-auto">
        <AnswerProvenance research={research} />
      </div>
    </div>
  )
}
