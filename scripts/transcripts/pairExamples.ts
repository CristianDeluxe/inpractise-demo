import type { MemoryExample } from '@/transcripts/contracts/MemoryExample.ts'
import { alignWords } from './alignWords.ts'
import { classifyHunks } from './classifyHunks.ts'
import { isLearnableHunk } from './isLearnableHunk.ts'
import type { PairText } from './PairText.ts'
import { paragraphBreakPattern } from './paragraphBreakPattern.ts'
import { splitWords } from './splitWords.ts'

/** Paragraph pairs holding a learnable hunk, when raw and final split into the same paragraph count. */
export function pairExamples(
  pair: PairText,
  existing: readonly MemoryExample[],
): MemoryExample[] {
  const raws = pair.raw.split(paragraphBreakPattern).map((text) => text.trim())
  const finals = pair.final
    .split(paragraphBreakPattern)
    .map((text) => text.trim())
  if (raws.length !== finals.length) return []
  const transcriptId = `pair:${pair.name}`
  const known = new Set(
    existing
      .filter((example) => example.transcriptId === transcriptId)
      .map((example) => example.paragraphId),
  )
  return raws.flatMap((raw, index) => {
    const paragraphId = `p${String(index)}`
    const final = finals[index] ?? ''
    const learnable = classifyHunks(
      alignWords(splitWords(raw), splitWords(final)),
    ).some((hunk) => isLearnableHunk(hunk))
    return learnable && !known.has(paragraphId)
      ? [{ transcriptId, paragraphId, raw, corrected: final }]
      : []
  })
}
