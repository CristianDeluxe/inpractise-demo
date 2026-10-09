import { useMediaQuery } from '@/transcripts/hooks/useMediaQuery'
import type { AnswerProvenanceProps } from './AnswerProvenanceProps'
import { EvidenceInspector } from './EvidenceInspector'
import { InvestigationInspector } from './InvestigationInspector'

/**
 * Search stages and diagnostics, kept whole. Collapsed below the answer on
 * narrow screens, open in a side rail on wide ones: they are for checking a
 * result, not for reading it.
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
  const wide = useMediaQuery('(min-width: 1280px)')
  return (
    <details
      open={wide ? true : undefined}
      className="mt-10 rounded-lg border border-border bg-card p-4 xl:mt-0"
    >
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
