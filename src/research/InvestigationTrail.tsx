import type { InvestigationTrailProps } from './InvestigationTrailProps'
import { investigationStageLabel } from './investigationStageLabel'

/**
 * The bounded loop's phases as they arrive, each timestamped by the elapsed
 * milliseconds the server reported for it. The plan phase nests the planned
 * sub-questions beneath it, so the steps that follow read against the plan
 * that produced them.
 */
export function InvestigationTrail({
  stages,
  pending,
}: InvestigationTrailProps) {
  if (!stages.length) return null
  return (
    <ol aria-label="Investigation progress" className="space-y-2">
      {stages.map((stage, index) => (
        <li key={`${stage.phase}-${String(index)}`} className="text-sm">
          <div className="flex items-baseline gap-3">
            <span
              aria-hidden="true"
              className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${
                pending && index === stages.length - 1
                  ? 'animate-pulse bg-primary'
                  : 'bg-border'
              }`}
            />
            <span>
              {investigationStageLabel(stage)}
              <span className="ml-2 text-xs text-muted-foreground">
                {(stage.elapsedMs / 1000).toFixed(1)}s
              </span>
            </span>
          </div>
          {stage.phase === 'plan' ? (
            <ol className="ml-4 mt-2 list-decimal space-y-1 pl-4 text-xs text-muted-foreground">
              {stage.subQuestions.map((subQuestion) => (
                <li key={subQuestion.index}>
                  {subQuestion.question}
                  {subQuestion.company ? ` (${subQuestion.company})` : ''}
                </li>
              ))}
            </ol>
          ) : null}
        </li>
      ))}
    </ol>
  )
}
