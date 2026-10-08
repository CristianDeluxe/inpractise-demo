import type { MemoryExample } from '@/transcripts/contracts/MemoryExample.ts'
import { alignWords } from './alignWords.ts'
import { classifyHunks } from './classifyHunks.ts'
import { isLearnableHunk } from './isLearnableHunk.ts'
import type { PairText } from './PairText.ts'
import { paragraphBreakPattern } from './paragraphBreakPattern.ts'
import { splitWords } from './splitWords.ts'

/**
 * Paragraph pairs holding a learnable hunk, when raw and final split into the
 * same paragraph count. Examples are keyed by the transcript the pair was
 * exported from, so a transcript that already taught examples is skipped.
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
  const taught = existing.some(
    (example) => example.transcriptId === transcriptId,
  )
  if (raws.length !== finals.length || taught) return []
  return raws.flatMap((raw, index) => {
    const final = finals[index] ?? ''
    const learnable = classifyHunks(
      alignWords(splitWords(raw), splitWords(final)),
    ).some((hunk) => isLearnableHunk(hunk))
    return learnable
      ? [
          {
            transcriptId,
            paragraphId: `p${String(index)}`,
            raw,
            corrected: final,
          },
        ]
      : []
  })
}
