import type { AnswerScopeInput } from './AnswerScopeInput.ts'

/**
 * The retrieval context every answer carries, whatever its status. The
 * diagnostic record is included only for a principal the endpoint discloses it
 * to; a missing vintage is omitted rather than reported as none.
 */
export function answerScope(input: AnswerScopeInput) {
  return {
    mode: input.mode,
    candidateCount: input.candidateCount,
    ...(input.vintage === undefined ? {} : { vintage: input.vintage }),
    ...(input.detailed ? { diagnostics: input.record } : {}),
  }
}
