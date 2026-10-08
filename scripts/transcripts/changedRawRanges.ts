import { diffOps } from '@/transcripts/diff/diffOps.ts'
import { splitTokens } from '@/transcripts/diff/splitTokens.ts'
import type { CharRange } from '@/transcripts/edits/CharRange.ts'
import { wordOffsets } from '@/transcripts/edits/wordOffsets.ts'

/** Character ranges of the raw words the model's text no longer keeps, by word diff. */
export function changedRawRanges(raw: string, modelText: string): CharRange[] {
  const words = splitTokens(raw)
  const offsets = wordOffsets(words)
  const ranges: CharRange[] = []
  let index = 0
  for (const op of diffOps(words, splitTokens(modelText))) {
    if (op.kind === 'added') continue
    const start = offsets[index] ?? 0
    if (op.kind === 'removed')
      ranges.push({ start, end: start + (words[index]?.length ?? 0) })
    index += 1
  }
  return ranges
}
