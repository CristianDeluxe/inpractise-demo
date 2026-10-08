import type { AnswerProvenanceProps } from './AnswerProvenanceProps'
import { EvidenceInspector } from './EvidenceInspector'
import { InvestigationInspector } from './InvestigationInspector'

/**
 * Search stages and diagnostics, kept whole but
 * collapsed and below the answer: they are for checking a result, not for
 * reading it.
 */
export function AnswerProvenance({ research }: AnswerProvenanceProps) {
  const answer =
    research.answer.state.status === 'success'
      ? research.answer.state.data.data
      : undefined
  const investigation =
    research.investigation.state.status === 'success'
      ? research.investigation.state.data.data
      : undefined
  return (
    <details className="mt-10 rounded-lg border border-border bg-card p-4">
      <summary className="cursor-pointer font-sans text-base">
        How this answer was found
      </summary>
      <div className="mt-4">
        {research.mode === 'investigate' ? (
          <InvestigationInspector
            answer={investigation}
            stages={research.investigationProgress.stages}
            pending={research.investigation.state.status === 'loading'}
          />
        ) : (
          <EvidenceInspector
            answer={answer}
            stages={research.progress.stages}
            pending={research.answer.state.status === 'loading'}
          />
        )}
      </div>
    </details>
  )
}
