import type { MergedEvidence } from './MergedEvidence.ts'
import type { SubQuestionEvidence } from './SubQuestionEvidence.ts'
import type { SubQuestionResult } from './SubQuestionResult.ts'
import type { Synthesis } from './Synthesis.ts'

/**
 * The per-part breakdown. The model's status stands only where the corpus
 * gave it something to stand on: a part that supplied no passage, or an
 * answer that ended not_found, is not_found whatever the model said. The
 * citations attributed to a part are those the final answer kept.
 */
export function subQuestionResults(
  evidence: readonly SubQuestionEvidence[],
  merged: MergedEvidence,
  synthesis: Synthesis | null,
  citedIds: ReadonlySet<string>,
): SubQuestionResult[] {
  return evidence.map((entry): SubQuestionResult => {
    const index = entry.subQuestion.index
    const supplied = [...merged.attribution.entries()]
      .filter(([, indexes]) => indexes.includes(index))
      .map(([key]) => key)
    const reported = synthesis?.subQuestions.find(
      (part) => part.index === index,
    )?.status
    const established =
      synthesis !== null && synthesis.status !== 'not_found' && supplied.length
    return {
      index,
      question: entry.subQuestion.question,
      ...(entry.subQuestion.company === undefined
        ? {}
        : { company: entry.subQuestion.company }),
      ...(entry.originalQuestion === undefined
        ? {}
        : { originalQuestion: entry.originalQuestion }),
      status: established ? (reported ?? 'not_found') : 'not_found',
      mode: entry.mode,
      candidateCount: entry.candidates.length,
      selectedCount: entry.selected.length,
      suppliedCount: supplied.length,
      citationIds: supplied.filter((key) => citedIds.has(key)),
    }
  })
}
