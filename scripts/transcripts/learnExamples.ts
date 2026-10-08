import type { MemoryExample } from '@/transcripts/contracts/MemoryExample.ts'
import type { LearnExamplesInput } from './LearnExamplesInput.ts'

/** New examples: paragraphs with a counted edit and no rejected one, deduped by transcript and paragraph. */
export function learnExamples(input: LearnExamplesInput): MemoryExample[] {
  const known = new Set(
    input.existing
      .filter((example) => example.transcriptId === input.transcriptId)
      .map((example) => example.paragraphId),
  )
  return input.run.paragraphs.flatMap((paragraph) => {
    const raw = input.rawByParagraph.get(paragraph.paragraphId)
    const rejected = input.edits.some(
      (edit) =>
        edit.paragraphId === paragraph.paragraphId &&
        edit.verdict === 'rejected',
    )
    const counted = input.counted.some(
      (edit) => edit.paragraphId === paragraph.paragraphId,
    )
    if (
      raw === undefined ||
      rejected ||
      !counted ||
      known.has(paragraph.paragraphId)
    )
      return []
    return [
      {
        transcriptId: input.transcriptId,
        paragraphId: paragraph.paragraphId,
        raw,
        corrected: paragraph.text,
      },
    ]
  })
}
