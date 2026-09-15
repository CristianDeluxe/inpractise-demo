import { validateProviderAnswer } from '../api/validators/validateProviderAnswer.ts'
import { investigateSchema } from './investigateSchema'

/**
 * Shape validation is not enough: claim references must also resolve inside
 * this response's validated citations, exactly as a standalone ask is
 * checked. Keep this second check when changing the schema so syntactically
 * valid but unsupported prose cannot reach the UI.
 */
export function parseInvestigateData(input: unknown) {
  const data = investigateSchema.parse(input)
  const answer = validateProviderAnswer(
    {
      status: data.status,
      claims: data.claims,
      missingEvidence: data.missingEvidence,
    },
    new Set(data.citations.map((citation) => citation.citationId)),
  )
  return { ...data, ...answer }
}
