import type { CorrectionEdit } from '@/transcripts/contracts/CorrectionEdit.ts'
import { endsSentence } from './endsSentence.ts'
import type { FillerEditInput } from './FillerEditInput.ts'
import { rangesOverlap } from './rangesOverlap.ts'
import { spanAbsorbingNext } from './spanAbsorbingNext.ts'
import { spanAbsorbingPrevious } from './spanAbsorbingPrevious.ts'
import { wordStartOffsets } from './wordStartOffsets.ts'

/** A rule edit that removes one run of fillers, or null when it would touch another edit's text. */
export function fillerEdit({
  paragraphId,
  words,
  run,
  taken,
}: FillerEditInput): CorrectionEdit | null {
  const starts = wordStartOffsets(words)
  const ordered = endsSentence(words[run.last] ?? '')
    ? [spanAbsorbingPrevious(words, run), spanAbsorbingNext(words, run)]
    : [spanAbsorbingNext(words, run), spanAbsorbingPrevious(words, run)]
  for (const span of ordered) {
    if (span === null) continue
    const from = words.slice(span.first, span.last + 1).join(' ')
    const start = starts[span.first] ?? 0
    if (rangesOverlap({ start, end: start + from.length }, taken)) continue
    return {
      id: `${paragraphId}-f${String(run.first)}`,
      paragraphId,
      from,
      to: span.to,
      category: 'filler',
      origin: 'rule',
      reason: 'Filler removed by the clean-verbatim rule',
      confidence: 1,
      at: [start],
    }
  }
  return null
}
