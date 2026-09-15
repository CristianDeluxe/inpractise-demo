import { compareStageLabel } from './compareStageLabel'
import type { CompareStageTrailProps } from './CompareStageTrailProps'

/**
 * The phases as they arrive. Retrieval and selection are reported once per
 * side, before generation, which is the order that gives each count meaning.
 */
export function CompareStageTrail({ stages, pending }: CompareStageTrailProps) {
  if (!stages.length) return null
  return (
    <ol aria-label="Cross-reference progress" className="space-y-2">
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
          <span>{compareStageLabel(stage)}</span>
        </li>
      ))}
    </ol>
  )
}
