import type { DiagnosticInput } from './DiagnosticInput.ts'

/**
 * Gold labels are required; an ordinary unanswered question cannot be classified.
 * Check candidate presence before selected context so a retrieval miss cannot
 * be relabeled as a selection miss merely because both stages lack the evidence.
 */
export function classifyFailure(
  input: DiagnosticInput,
): 'pass' | 'retrieval_miss' | 'selection_miss' {
  if (!input.goldIds.length) throw new Error('Gold labels required')
  if (input.goldIds.some((id) => !input.candidateIds.includes(id)))
    return 'retrieval_miss'
  if (input.goldIds.some((id) => !input.contextIds.includes(id)))
    return 'selection_miss'
  return 'pass'
}
