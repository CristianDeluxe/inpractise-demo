import type { AskStage } from '@/api/AskStage'
import type { TimedAskStage } from './TimedAskStage'

/** Sum of every phase's server-side duration, or undefined when none carried one. */
export function totalElapsedMs(
  stages: readonly AskStage[] | undefined,
): number | undefined {
  if (!stages?.length) return undefined
  const known = stages.filter(
    (stage): stage is TimedAskStage => stage.elapsedMs !== undefined,
  )
  if (!known.length) return undefined
  return known.reduce((total, stage) => total + stage.elapsedMs, 0)
}
