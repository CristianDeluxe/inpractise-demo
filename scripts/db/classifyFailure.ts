import type { DiagnosticInput } from './DiagnosticInput.ts'

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
