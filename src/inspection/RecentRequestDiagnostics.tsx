import { EvidenceId } from '@/components/EvidenceId'
import type { RecentRequestDiagnosticsProps } from './RecentRequestDiagnosticsProps'

/** One retrieval record: its side, if any, and the revisions it read. */
export function RecentRequestDiagnostics({
  label,
  diagnostics,
}: RecentRequestDiagnosticsProps) {
  return (
    <div>
      {label === undefined ? null : (
        <p className="text-sm font-medium">
          {label}
          <span className="ml-2 font-mono text-xs text-muted-foreground">
            {diagnostics.candidateAt10.length} ranked ·{' '}
            {diagnostics.selectedIds.length} selected ·{' '}
            {diagnostics.selectedTokens} tokens
          </span>
        </p>
      )}
      <div className="mt-2 flex flex-wrap items-center gap-2">
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
