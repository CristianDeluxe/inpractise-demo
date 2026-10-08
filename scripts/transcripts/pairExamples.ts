import type { MemoryExample } from '@/transcripts/contracts/MemoryExample.ts'
import { alignWords } from './alignWords.ts'
import { classifyHunks } from './classifyHunks.ts'
import { isLearnableHunk } from './isLearnableHunk.ts'
import type { PairText } from './PairText.ts'
import { paragraphBreakPattern } from './paragraphBreakPattern.ts'
import { paragraphIdFor } from './paragraphIdFor.ts'
import { splitWords } from './splitWords.ts'

/**
 * Paragraph pairs holding a learnable hunk, when raw and final split into the
 * same paragraph count. Examples are keyed by the transcript the pair was
 * exported from and the same paragraph ids the review uses (p0001, ...), so a
 * paragraph already learned from the review is not learned twice.
 */
export function pairExamples(
  pair: PairText,
  existing: readonly MemoryExample[],
): MemoryExample[] {
  const raws = pair.raw.split(paragraphBreakPattern).map((text) => text.trim())
  const finals = pair.final
    .split(paragraphBreakPattern)
    .map((text) => text.trim())
  const transcriptId = pair.name
  const known = new Set(
    existing
      .filter((example) => example.transcriptId === transcriptId)
      .map((example) => example.paragraphId),
  )
  if (raws.length !== finals.length) return []
  return raws.flatMap((raw, index) => {
    const paragraphId = paragraphIdFor(index + 1)
    const final = finals[index] ?? ''
    const learnable = classifyHunks(
      alignWords(splitWords(raw), splitWords(final)),
    ).some((hunk) => isLearnableHunk(hunk))
    return learnable && !known.has(paragraphId)
      ? [{ transcriptId, paragraphId, raw, corrected: final }]
      : []
  })
}
