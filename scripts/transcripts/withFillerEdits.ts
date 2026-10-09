import type { CorrectionRun } from '@/transcripts/contracts/CorrectionRun.ts'
import type { TranscriptDocument } from '@/transcripts/contracts/TranscriptDocument.ts'
import { paragraphFillerEdits } from './paragraphFillerEdits.ts'

/** The run with earlier rule edits replaced by a fresh clean-verbatim pass over the raw words. */
export function withFillerEdits(
  transcript: TranscriptDocument,
  run: CorrectionRun,
): CorrectionRun {
  const words = new Map(
    transcript.paragraphs.map((p) => [p.id, p.words.map((w) => w.text)]),
  )
  return {
    ...run,
    paragraphs: run.paragraphs.map((paragraph) => {
      const kept = paragraph.edits.filter((edit) => edit.origin !== 'rule')
      const added = paragraphFillerEdits(
        paragraph.paragraphId,
        words.get(paragraph.paragraphId) ?? [],
        kept,
      )
      return { ...paragraph, edits: [...kept, ...added] }
    }),
  }
}
