import { validateProviderAnswer } from '@/api/validators/validateProviderAnswer'
import { askSchema } from './askSchema'

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
