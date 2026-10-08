import { diffOps } from '@/transcripts/diff/diffOps.ts'
import { splitTokens } from '@/transcripts/diff/splitTokens.ts'

/** Words the model changed without reporting an edit for them; they are discarded. */
export function countUnreported(rebuilt: string, modelText: string): number {
  return diffOps(splitTokens(rebuilt), splitTokens(modelText)).filter(
    (op) => op.kind !== 'equal',
  ).length
}
