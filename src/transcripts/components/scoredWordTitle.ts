import { formatReliability } from '../formatters/formatReliability'
import { reliableWordThreshold } from '../reliability/reliableWordThreshold'

/** Hover text for a marked word; reliable words need none. */
export function scoredWordTitle(score: number): string | undefined {
  if (score >= reliableWordThreshold) return undefined
  return `Reliability ${formatReliability(score)}: optional spot-check`
}
