import { validateProviderAnswer } from '../api/validators/validateProviderAnswer.ts'
import { askSchema } from './askSchema'

/**
 * Shape validation is not enough: claim references must also resolve inside this
 * response's validated citations. Keep this second check when changing the answer
 * schema so syntactically valid but unsupported prose cannot reach the UI.
 */
export function parseAskData(input: unknown) {
  const data = askSchema.parse(input)
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
