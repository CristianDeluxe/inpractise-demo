import { parseModelJson } from './parseModelJson.ts'
import type { ProviderAnswer } from './ProviderAnswer.ts'
import { ProviderAnswerSchema } from './ProviderAnswerSchema.ts'

/** A malformed answer is a model failure, never a refusal shown to the reader. */
export function parseProviderAnswer(content: string): ProviderAnswer {
  return parseModelJson(ProviderAnswerSchema, content)
}
