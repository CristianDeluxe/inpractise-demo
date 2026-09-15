import { EvidenceId } from '@/components/EvidenceId'
import type { DiagnosticsPanelProps } from './DiagnosticsPanelProps'

export function DiagnosticsPanel({ diagnostics }: DiagnosticsPanelProps) {
  const selected = new Set(diagnostics.selectedIds)
  return (
    <div className="border border-border bg-secondary p-4 text-sm text-secondary-foreground">
      <h3 className="font-sans text-base">Ranked candidates</h3>
      <p className="mt-2 text-xs">
        {diagnostics.candidateAt10.length} ranked into the top ten,{' '}
        {diagnostics.selectedIds.length} survived context selection,{' '}
        {diagnostics.selectedTokens} tokens sent to the model. A passage listed
        here but not kept was retrieved and then dropped.
      </p>
      <ol className="mt-4 space-y-2">
        {diagnostics.candidateAt10.map((candidateId, index) => (
          <li key={candidateId} className="flex flex-wrap items-center gap-2">
            <span className="w-5 shrink-0 font-mono text-xs text-muted-foreground">
              {index + 1}
            </span>
            <EvidenceId identifier={candidateId} label="passage" />
            <span
              className={`eyebrow ${selected.has(candidateId) ? 'text-primary' : 'text-muted-foreground'}`}
            >
              {selected.has(candidateId) ? 'selected' : 'dropped'}
            </span>
          </li>
        ))}
      </ol>
      {diagnostics.revisionIds.length > 0 ? (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="eyebrow text-muted-foreground">Revisions read</span>
          {diagnostics.revisionIds.map((revisionId) => (
            <EvidenceId
              key={revisionId}
              identifier={revisionId}
              label="revision"
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
