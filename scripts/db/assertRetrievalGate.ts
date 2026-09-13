import type { DiagnosticInput } from './DiagnosticInput.ts'
import { classifyFailure } from './classifyFailure.ts'

export function assertRetrievalGate(input: DiagnosticInput): void {
  const result = classifyFailure(input)
  if (result !== 'pass') throw new Error(`Retrieval gate failed: ${result}`)
}
