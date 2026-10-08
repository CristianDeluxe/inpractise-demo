import { backtrackTrace } from './backtrackTrace.ts'
import type { Hunk } from './Hunk.ts'
import { matchKey } from './matchKey.ts'
import { myersTrace } from './myersTrace.ts'
import { opsToHunks } from './opsToHunks.ts'

/** Aligns raw against final on punctuation- and case-insensitive keys and returns what differs. */
export function alignWords(
  raw: readonly string[],
  final: readonly string[],
): Hunk[] {
  const trace = myersTrace(raw.map(matchKey), final.map(matchKey))
  return opsToHunks(backtrackTrace(trace, raw.length, final.length), raw, final)
}
