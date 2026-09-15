import { buildAskResult } from '../answer/buildAskResult.ts'
import type { InvestigationResultInput } from './InvestigationResultInput.ts'
import { investigationTrace } from './investigationTrace.ts'
import { subQuestionResults } from './subQuestionResults.ts'

/**
 * The terminal value: the grounded answer under the standalone-ask mapping
 * (numeric labels to citations, claims that lost evidence dropped), the
 * per-part breakdown, and the retrieval scope the whole loop ran in. Mode is
 * hybrid only when every step was; a lexical fallback anywhere is reported.
 */
export function buildInvestigationResult(input: InvestigationResultInput) {
  const answer = input.synthesis
    ? buildAskResult(
        input.synthesis,
        input.merged.sources,
        input.stillAuthorised,
      )
    : {
        status: 'not_found' as const,
        claims: [],
        missingEvidence: [
          'No authorised passage matched any part of this question.',
        ],
        citations: [],
      }
  const cited = new Set(answer.citations.map((citation) => citation.citationId))
  const synthesis =
    input.synthesis && answer.status !== 'not_found' ? input.synthesis : null
  return {
    ...answer,
    mode: input.evidence.every((entry) => entry.mode === 'hybrid')
      ? ('hybrid' as const)
      : ('lexical_only' as const),
    candidateCount: new Set(
      input.evidence.flatMap((entry) =>
        entry.candidates.map((candidate) => candidate.key),
      ),
    ).size,
    ...(input.vintage === undefined ? {} : { vintage: input.vintage }),
    question: input.question,
    subQuestions: subQuestionResults(
      input.evidence,
      input.merged,
      synthesis,
      cited,
    ),
    refinement: input.refinement,
    elapsedMs: input.elapsedMs,
    ...(input.detailed ? { trace: investigationTrace(input.evidence) } : {}),
  }
}
