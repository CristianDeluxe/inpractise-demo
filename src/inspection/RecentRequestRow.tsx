import { EvidenceId } from '@/components/EvidenceId'
import { formatRecordedAt } from './formatters/formatRecordedAt'
import type { RecentRequestRowProps } from './RecentRequestRowProps'
import { RequestMetrics } from './RequestMetrics'

export function RecentRequestRow({ request }: RecentRequestRowProps) {
  return (
    <li className="border-t border-border pt-4">
      <p
        title={request.recordedAt}
        className="font-mono text-xs text-muted-foreground"
      >
        {formatRecordedAt(request.recordedAt)}
      </p>
      {request.diagnostics === null ? (
        <p className="mt-3 text-sm">
          No diagnostic record was written for this request.
        </p>
      ) : (
        <>
          <RequestMetrics
            candidates={request.diagnostics.candidateAt10.length}
            selected={request.diagnostics.selectedIds.length}
            contextTokens={request.diagnostics.selectedTokens}
            generatedTokens={request.totalTokens}
          />
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="eyebrow text-muted-foreground">
              Revisions read
            </span>
            {request.diagnostics.revisionIds.map((revisionId) => (
              <EvidenceId
                key={revisionId}
                identifier={revisionId}
                label="revision"
              />
            ))}
          </div>
        </>
      )}
    </li>
  )
}
