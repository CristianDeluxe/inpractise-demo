import type { evidenceVintage } from './evidenceVintage.ts'
import type { retrievalDiagnostics } from './retrievalDiagnostics.ts'

export type AnswerScopeInput = {
  mode: 'hybrid' | 'lexical_only'
  candidateCount: number
  vintage: ReturnType<typeof evidenceVintage>
  record: ReturnType<typeof retrievalDiagnostics>
  detailed: boolean
}
