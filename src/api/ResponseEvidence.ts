import type { Citation } from './Citation.ts'
import type { ProviderAnswer } from './ProviderAnswer.ts'

export type ResponseEvidence = {
  citations: Citation[]
  answers: ProviderAnswer[]
}
