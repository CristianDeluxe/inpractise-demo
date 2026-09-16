import { EvidenceId } from '@/components/EvidenceId'
import type { RecentRequestDiagnosticsProps } from './RecentRequestDiagnosticsProps'
import { RequestMetrics } from './RequestMetrics'

/** One retrieval record: the four numbers and the revisions it read. */
export function RecentRequestDiagnostics({
  label,
  diagnostics,
  generatedTokens,
}: RecentRequestDiagnosticsProps) {
  return (
    <div>
      {label === undefined ? null : (
        <p className="mt-3 text-sm font-medium">{label}</p>
      )}
      <RequestMetrics
        candidates={diagnostics.candidateAt10.length}
        selected={diagnostics.selectedIds.length}
        contextTokens={diagnostics.selectedTokens}
        generatedTokens={generatedTokens}
      />
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="eyebrow text-muted-foreground">Revisions read</span>
        {diagnostics.revisionIds.map((revisionId) => (
          <EvidenceId
            key={revisionId}
            identifier={revisionId}
            label="revision"
          />
        ))}
      </div>
    </div>
  )
}
