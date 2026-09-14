import { answerStatusLabel } from './answerStatusLabel'
import type { AnswerViewProps } from './AnswerViewProps'
import { CitationCard } from './CitationCard'
import { ClaimRow } from './ClaimRow'
import { ConflictView } from './ConflictView'
import { DiagnosticsPanel } from './DiagnosticsPanel'
import { EvidenceVintageView } from './EvidenceVintageView'
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
      {answer.vintage ? <EvidenceVintageView vintage={answer.vintage} /> : null}
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
      {answer.diagnostics ? (
        <DiagnosticsPanel diagnostics={answer.diagnostics} />
      ) : null}
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
