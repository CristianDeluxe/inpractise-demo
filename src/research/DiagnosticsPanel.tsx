import type { DiagnosticsPanelProps } from './DiagnosticsPanelProps'

export function DiagnosticsPanel({ diagnostics }: DiagnosticsPanelProps) {
  const selected = new Set(diagnostics.selectedIds)
  return (
    <div className="mt-6 bg-secondary p-4 text-sm text-secondary-foreground">
      <h4 className="font-semibold">Retrieval diagnostics</h4>
      <p className="mt-2 text-xs">
        {diagnostics.candidateAt10.length} passages ranked into the top ten,{' '}
        {diagnostics.selectedIds.length} survived context selection,{' '}
        {diagnostics.selectedTokens} tokens sent to the model. A passage listed
        here but not kept was retrieved and then dropped: that is a selection
        loss, not a retrieval miss.
      </p>
      <ol className="mt-3 space-y-1 font-mono text-xs">
        {diagnostics.candidateAt10.map((candidateId, index) => (
          <li key={candidateId} className="flex gap-3">
            <span className="w-6 shrink-0">{index + 1}</span>
            <span className="break-all">{candidateId}</span>
            <span className="ml-auto shrink-0">
              {selected.has(candidateId) ? 'selected' : 'dropped'}
            </span>
          </li>
        ))}
      </ol>
      {diagnostics.revisionIds.length > 0 ? (
        <p className="mt-3 break-all text-xs">
          Revisions read: {diagnostics.revisionIds.join(', ')}
        </p>
      ) : null}
    </div>
  )
}
