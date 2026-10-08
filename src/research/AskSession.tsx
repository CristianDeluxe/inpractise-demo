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
    <div id="research" className="max-w-4xl min-w-0">
      <QuestionForm research={research} />
      <QuestionSuggestions research={research} />
      <p className="text-xs text-muted-foreground">
        Cancelling clears the request display; server work and consumed
        allowance may continue.
      </p>
      <AskSessionResults research={research} />
      <AnswerProvenance research={research} />
    </div>
  )
}
