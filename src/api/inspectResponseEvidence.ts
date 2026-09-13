import { ApiError } from './ApiError.ts'
import type { Citation } from './Citation.ts'
import { collectResponseObjects } from './collectResponseObjects.ts'
import type { ResponseEvidence } from './ResponseEvidence.ts'
import { validateCitationFields } from './validators/validateCitationFields.ts'
import { validateProviderAnswer } from './validators/validateProviderAnswer.ts'

/**
 * Inspects known evidence fields without assuming an action's unresolved wire layout.
 * Projections validate only citation and ProviderAnswer core fields. They do not reject
 * extra provider fields: the required backend parser must strictly validate the actual
 * ProviderAnswer boundary and permit only documented AnswerSchema metadata.
 */
export function inspectResponseEvidence(
  input: unknown,
  includeAnswers = false,
): ResponseEvidence {
  const objects = collectResponseObjects(input)
  const citations = new Map<string, Citation>()
  for (const object of objects) {
    if (!(
      Object.hasOwn(object, 'citationId') ||
      Object.hasOwn(object, 'readerPath') ||
      (Object.hasOwn(object, 'quote') && Object.hasOwn(object, 'documentId'))
    ))
      continue
    const citation = validateCitationFields(object)
    const previous = citations.get(citation.citationId)
    if (previous && JSON.stringify(previous) !== JSON.stringify(citation))
      throw new ApiError(
        'protocol',
        'One citation identity refers to conflicting evidence.',
      )
    citations.set(citation.citationId, citation)
  }
  const suppliedIds = new Set(citations.keys())
  const answers = (includeAnswers ? objects : [])
    .filter(
      (object) =>
        Object.hasOwn(object, 'claims') ||
        Object.hasOwn(object, 'missingEvidence'),
    )
    .map((object) =>
      validateProviderAnswer(
        {
          status: object['status'],
          claims: object['claims'],
          missingEvidence: object['missingEvidence'],
        },
        suppliedIds,
      ),
    )
  return { citations: [...citations.values()], answers }
}
