import { DiagnosticsPanel } from './DiagnosticsPanel'
import type { EvidenceInspectorProps } from './EvidenceInspectorProps'
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
    <section aria-label="Search details" className="space-y-6">
      <div className="border border-border bg-card p-4">
        <h2 className="font-sans text-base">How the search went</h2>
        {answer === undefined ? (
          <p className="mt-2 text-sm text-muted-foreground">
            Ask something and this panel reports which excerpts the search
            found, which were used, and which transcript versions were read.
          </p>
        ) : (
          <p className="mt-2 text-sm text-muted-foreground">
            {answer.mode === 'hybrid' ? 'Hybrid' : 'Lexical only'} search:{' '}
            {answer.candidateCount} excerpts found. Recall is measured before
            excerpts are chosen for the answer, so an excerpt that ranked and
            was then left out is a selection loss rather than a search miss.
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
          Ranked excerpt identifiers are withheld for this principal. The
          endpoint returns them only to an unrestricted reviewer.
        </p>
      )}
      <p className="border border-border p-4 text-xs text-muted-foreground">
        No podcast failure case measured yet.
      </p>
    </section>
  )
}
