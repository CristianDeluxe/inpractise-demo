import { DiagnosticsPanel } from './DiagnosticsPanel'
import type { EvidenceInspectorProps } from './EvidenceInspectorProps'
import { RecordedSelectionMissCard } from './RecordedSelectionMissCard'
import { StageTrail } from './StageTrail'

/**
 * The middle of the pipeline, beside the answer rather than under it. Detailed
 * diagnostics arrive only when the endpoint decided the caller may read them,
 * so their absence here is the authorization boundary working, not a gap.
 */
export function EvidenceInspector({
  answer,
  stages,
  pending,
}: EvidenceInspectorProps) {
  return (
    <section aria-label="Why this answer" className="space-y-6">
      <div className="border border-border bg-card p-4">
        <h2 className="font-sans text-base">Why this answer</h2>
        {answer === undefined ? (
          <p className="mt-2 text-sm text-muted-foreground">
            Ask something and this panel reports what retrieval found, what
            context selection kept, and which revisions were read.
          </p>
        ) : (
          <p className="mt-2 text-sm text-muted-foreground">
            {answer.mode === 'hybrid' ? 'Hybrid' : 'Lexical only'} retrieval
            over {answer.candidateCount} candidates. Recall is measured before
            context selection, so a passage that ranked and was then dropped is
            a selection loss rather than a retrieval miss.
          </p>
        )}
        <div className="mt-4">
          <StageTrail stages={stages} pending={pending} />
        </div>
      </div>
      {answer?.diagnostics ? (
        <DiagnosticsPanel diagnostics={answer.diagnostics} />
      ) : answer === undefined ? null : (
        <p className="border border-border p-4 text-xs text-muted-foreground">
          Ranked candidate identifiers are withheld for this principal. The
          endpoint returns them only to an unrestricted reviewer.
        </p>
      )}
      <RecordedSelectionMissCard />
    </section>
  )
}
