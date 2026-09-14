import { ApiError } from '../ApiError.ts'
import type { ProviderAnswer } from '../ProviderAnswer.ts'
import { parseProtocol } from '../parseProtocol.ts'
import { providerAnswerWireSchema } from './providerAnswerWireSchema.ts'

export function validateProviderAnswer(
  input: unknown,
  suppliedCitationIds: ReadonlySet<string>,
): ProviderAnswer {
  const answer = parseProtocol(providerAnswerWireSchema, input)
  if (
    answer.claims.some(
      (claim) =>
        !claim.text.trim() ||
        claim.citationIds.some((id) => !suppliedCitationIds.has(id)),
    )
  ) {
    throw new ApiError(
      'protocol',
      'The answer cites evidence outside its supplied context.',
    )
  }
  if (answer.status === 'not_found') {
    if (answer.claims.length !== 0)
      throw new ApiError(
        'protocol',
        'A not_found answer cannot contain claims.',
      )
    return { ...answer, status: 'not_found', claims: [] }
  }
  const [first, ...rest] = answer.claims
  if (!first)
    throw new ApiError(
      'protocol',
      'A supported answer must contain claims and citations.',
    )
  return { ...answer, status: answer.status, claims: [first, ...rest] }
}
