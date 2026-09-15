import { answerStatusLabel } from '@/research/answerStatusLabel'
import { CitationCard } from '@/research/CitationCard'
import { ClaimRow } from '@/research/ClaimRow'
import { compareSideLabel } from './compareSideLabel'
import type { CompareSideViewProps } from './CompareSideViewProps'

export function CompareSideView({ name, side }: CompareSideViewProps) {
  return (
    <div aria-label={compareSideLabel(name)} className="min-w-0">
      <div className="flex items-center justify-between gap-3 border-b border-border pb-3">
        <h3 className="font-sans text-lg">{compareSideLabel(name)}</h3>
        <p className="text-xs text-muted-foreground">
          {side.candidateCount} candidates
        </p>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        {answerStatusLabel(side.status)}
      </p>
      {side.status === 'not_found' ? (
        <p className="mt-4 text-sm">
          No supporting passage was found for this topic on this side.
        </p>
      ) : (
        <ul className="my-6 space-y-5">
          {side.claims.map((claim) => (
            <ClaimRow
              key={claim.claimId}
              claim={claim}
              citations={side.citations}
            />
          ))}
        </ul>
      )}
      {side.missingEvidence.length > 0 ? (
        <div className="bg-warning p-4 text-sm text-warning-foreground">
          <h4 className="font-semibold">Missing evidence</h4>
          <ul className="mt-2 list-disc pl-5">
            {side.missingEvidence.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ul>
        </div>
      ) : null}
      {side.citations.map((citation) => (
        <CitationCard key={citation.citationId} citation={citation} />
      ))}
    </div>
  )
}
