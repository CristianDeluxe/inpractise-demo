import { buildContext } from '../answer/buildContext.ts'
import type { MergedEvidence } from './MergedEvidence.ts'
import type { SubQuestion } from './SubQuestion.ts'

/** The synthesis prompt's user message: the question, its sub-questions, the
 * fenced passages, and which sub-question each passage was retrieved for. */
export function synthesisTranscript(
  question: string,
  plan: readonly SubQuestion[],
  merged: MergedEvidence,
): string {
  const subQuestions = plan
    .map(
      (entry) =>
        `${String(entry.index)}. ${entry.question}` +
        (entry.company ? ` (${entry.company})` : ''),
    )
    .join('\n')
  const retrievedFor = merged.candidates
    .map(
      (candidate, index) =>
        `Passage ${String(index + 1)} was retrieved for sub-question ${(
          merged.attribution.get(candidate.key) ?? []
        )
          .map(String)
          .join(', ')}.`,
    )
    .join('\n')
  return (
    `Question: ${question}\n\nSub-questions:\n${subQuestions}\n\n` +
    `Passages:\n${buildContext(merged.sources)}\n\n${retrievedFor}\n\n` +
    'Reply with JSON only: {"status":"answered|partial|conflict|not_found",' +
    '"claims":[{"text":"...","sources":[1]}],"missingEvidence":["..."],' +
    '"subQuestions":[{"index":1,"status":"answered|partial|not_found"}]}'
  )
}
