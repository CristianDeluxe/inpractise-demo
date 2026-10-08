import type { MemoryExample } from '@/transcripts/contracts/MemoryExample.ts'
import { applyEdits } from '@/transcripts/edits/applyEdits.ts'
import type { LearnExamplesInput } from './LearnExamplesInput.ts'

/**
 * New examples: paragraphs whose every edit was counted, rebuilt from the raw
 * text with those edits only, so nothing unreviewed becomes a lesson. Deduped
 * by transcript and paragraph.
 */
export function learnExamples(input: LearnExamplesInput): MemoryExample[] {
  const known = new Set(
    input.existing
      .filter((example) => example.transcriptId === input.transcriptId)
      .map((example) => example.paragraphId),
  )
  const counted = new Set(input.counted.map((edit) => edit.id))
  return input.run.paragraphs.flatMap((paragraph) => {
    const raw = input.rawByParagraph.get(paragraph.paragraphId)
    const edits = input.edits.filter(
      (edit) => edit.paragraphId === paragraph.paragraphId,
    )
    const reviewed =
      edits.length > 0 && edits.every((edit) => counted.has(edit.id))
    if (raw === undefined || !reviewed || known.has(paragraph.paragraphId))
      return []
    return [
      {
        transcriptId: input.transcriptId,
        paragraphId: paragraph.paragraphId,
        raw,
        corrected: applyEdits(raw, edits, () => true),
      },
    ]
  })
}
