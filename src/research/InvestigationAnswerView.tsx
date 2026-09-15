import { answerStatusLabel } from './answerStatusLabel'
import { CitationCard } from './CitationCard'
import { ClaimRow } from './ClaimRow'
import { ConflictView } from './ConflictView'
import { EvidenceVintageView } from './EvidenceVintageView'
import type { InvestigationAnswerViewProps } from './InvestigationAnswerViewProps'
import { notFoundExplanation } from './notFoundExplanation'
import { SubQuestionBreakdown } from './SubQuestionBreakdown'

/**
 * The synthesised answer under the same grounded-claim contract as a
 * standalone ask, with the per-sub-question breakdown shown first so a reader
 * sees which parts of the question the corpus could establish before reading
 * the merged claims.
 */
export function InvestigationAnswerView({
  answer,
}: InvestigationAnswerViewProps) {
  return (
    <section aria-label="Investigation result" className="mt-8">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <h3 className="font-sans text-xl">
          {answerStatusLabel(answer.status)}
        </h3>
        <p className="text-xs text-muted-foreground">
          {answer.mode === 'hybrid' ? 'Hybrid' : 'Lexical only'} ·{' '}
          {answer.candidateCount} candidates ·{' '}
          {(answer.elapsedMs / 1000).toFixed(1)}s
        </p>
      </div>
      {answer.vintage ? <EvidenceVintageView vintage={answer.vintage} /> : null}
      <SubQuestionBreakdown subQuestions={answer.subQuestions} />
      {answer.status === 'not_found' ? (
        <p className="mt-5">{notFoundExplanation(answer.candidateCount)}</p>
      ) : null}
      {answer.status === 'conflict' ? (
        <ConflictView claims={answer.claims} citations={answer.citations} />
      ) : (
        <ul className="my-6 space-y-5">
          {answer.claims.map((claim) => (
            <ClaimRow
              key={claim.text}
              claim={claim}
              citations={answer.citations}
            />
          ))}
        </ul>
      )}
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
