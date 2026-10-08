import type { ReviewDecision } from '@/transcripts/contracts/ReviewDecision.ts'
import type { ReviewableRun } from './ReviewableRun.ts'
import type { ReviewedEdit } from './ReviewedEdit.ts'

/** Every edit of the run with its latest verdict, or pending. */
export function attachVerdicts(
  run: ReviewableRun,
  decisions: readonly ReviewDecision[],
): ReviewedEdit[] {
  const verdicts = new Map(
    decisions
      .toSorted((a, b) => a.decidedAt.localeCompare(b.decidedAt))
      .map((decision) => [decision.editId, decision.verdict] as const),
  )
  return run.paragraphs.flatMap((paragraph) =>
    paragraph.edits.map((edit) => ({
      ...edit,
      verdict: verdicts.get(edit.id) ?? 'pending',
    })),
  )
}
