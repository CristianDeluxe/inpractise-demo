import { answerStatusLabel } from './answerStatusLabel'
import type { AnswerViewProps } from './AnswerViewProps'
import { CitationCard } from './CitationCard'
import { ClaimRow } from './ClaimRow'
import { notFoundExplanation } from './notFoundExplanation'

export function AnswerView({ answer }: AnswerViewProps) {
  return (
    <section aria-label="Answer" className="mt-8">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <h3 className="font-sans text-xl">
          {answerStatusLabel(answer.status)}
        </h3>
        <p className="text-xs text-muted-foreground">
          {answer.mode === 'hybrid' ? 'Hybrid' : 'Lexical only'} ·{' '}
          {answer.candidateCount} candidates
        </p>
      </div>
      {answer.status === 'not_found' ? (
        <p className="mt-5">{notFoundExplanation(answer.candidateCount)}</p>
      ) : null}
      <ul className="my-6 space-y-5">
        {answer.claims.map((claim) => (
          <ClaimRow
            key={claim.text}
            claim={claim}
            citations={answer.citations}
          />
        ))}
      </ul>
      {answer.missingEvidence.length > 0 ? (
        <div className="bg-warning p-4 text-sm text-warning-foreground">
          <h4 className="font-semibold">Missing evidence and limitations</h4>
          <ul className="mt-2 list-disc pl-5">
            {answer.missingEvidence.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ul>
        </div>
      ) : null}
      {answer.citations.map((citation) => (
        <CitationCard key={citation.citationId} citation={citation} />
      ))}
    </section>
  )
}
