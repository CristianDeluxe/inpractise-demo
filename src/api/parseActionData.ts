import { ApiError } from './ApiError.ts'
import type { DataParser } from './DataParser.ts'
import type { ResearchRequest } from './ResearchRequest.ts'
import { inspectResponseEvidence } from './inspectResponseEvidence.ts'
import { validateActionEvidence } from './validators/validateActionEvidence.ts'

export function parseActionData<T extends Record<string, unknown>>(
  request: ResearchRequest,
  input: unknown,
  parser: DataParser<T>,
): T {
  validateActionEvidence(request, input)
  const originalCitations = new Map(
    inspectResponseEvidence(input).citations.map((citation) => [
      citation.citationId,
      JSON.stringify(citation),
    ]),
  )
  let parsed: T
  try {
    parsed = parser(input)
  } catch {
    throw new ApiError(
      'protocol',
      'The response does not match the configured action schema.',
    )
  }
  validateActionEvidence(request, parsed)
  for (const citation of inspectResponseEvidence(parsed).citations) {
    if (originalCitations.get(citation.citationId) !== JSON.stringify(citation))
      throw new ApiError(
        'protocol',
        'The action parser changed server-owned citation evidence.',
      )
  }
  return parsed
}
