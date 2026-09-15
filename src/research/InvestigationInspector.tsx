import type { InvestigationInspectorProps } from './InvestigationInspectorProps'
import { InvestigationTrail } from './InvestigationTrail'

/**
 * The bounded loop beside its answer, not under it. The trace is inspectable
 * as it happens: a bounded plan, one retrieval per sub-question, at most one
 * refinement, then synthesis, each timestamped by the server's own clock.
 */
export function InvestigationInspector({
  answer,
  stages,
  pending,
}: InvestigationInspectorProps) {
  return (
    <section aria-label="Investigation trace" className="space-y-6">
      <div className="border border-border bg-card p-4">
        <h2 className="font-sans text-base">Investigation trace</h2>
        {answer === undefined ? (
          <p className="mt-2 text-sm text-muted-foreground">
            Ask a question and this panel reports the plan, each
            sub-question&apos;s retrieval, any refinement, and the synthesis, in
            the order the server ran them.
          </p>
        ) : (
          <p className="mt-2 text-sm text-muted-foreground">
            {answer.subQuestions.length} sub-question
            {answer.subQuestions.length === 1 ? '' : 's'} · refinement:{' '}
            {answer.refinement}
          </p>
        )}
        <div className="mt-4">
          <InvestigationTrail stages={stages} pending={pending} />
        </div>
      </div>
    </section>
  )
}
