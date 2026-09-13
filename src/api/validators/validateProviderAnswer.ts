import { z } from 'zod'
import { ApiError } from '../ApiError.ts'
import type { ProviderAnswer } from '../ProviderAnswer.ts'
import { parseProtocol } from '../parseProtocol.ts'

export function validateProviderAnswer(
  input: unknown,
  suppliedCitationIds: ReadonlySet<string>,
): ProviderAnswer {
  const answer = parseProtocol(
    z.strictObject({
      status: z.enum(['answered', 'partial', 'conflict', 'not_found']),
      claims: z
        .array(
          z.strictObject({
            text: z.string().min(1).max(500),
            citationIds: z.array(z.string().min(1)).min(1),
          }),
        )
        .max(4),
      missingEvidence: z.array(z.string()),
    }),
    input,
  )
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
