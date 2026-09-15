import { stageLabel } from './stageLabel'
import type { StageTrailProps } from './StageTrailProps'

/**
 * The phases as they arrive. Recall is reported before selection and the
 * recheck after generation, which is the order that makes each number mean
 * what it says.
 */
export function StageTrail({ stages, pending }: StageTrailProps) {
  if (!stages.length) return null
  return (
    <ol aria-label="Answer progress" className="space-y-2">
      {stages.map((stage, index) => (
        <li key={stage.phase} className="flex items-baseline gap-3 text-sm">
          <span
            aria-hidden="true"
            className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${
              pending && index === stages.length - 1
                ? 'animate-pulse bg-primary'
                : 'bg-border'
            }`}
          />
          <span>{stageLabel(stage)}</span>
        </li>
      ))}
    </ol>
  )
}
