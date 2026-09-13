import { z } from 'zod'
import { ApiError } from '../ApiError.ts'
import { inspectResponseEvidence } from '../inspectResponseEvidence.ts'
import { parseProtocol } from '../parseProtocol.ts'
import type { ResearchRequest } from '../ResearchRequest.ts'
import { validateReadEvidence } from './validateReadEvidence.ts'

export function validateActionEvidence(
  request: ResearchRequest,
  input: unknown,
): void {
  parseProtocol(z.record(z.string(), z.unknown()), input)
  const evidence = inspectResponseEvidence(input, request.action === 'ask')
  if (request.action === 'ask' && evidence.answers.length !== 1)
    throw new ApiError(
      'protocol',
      'An ask response must contain exactly one structured answer.',
    )
  if (request.action === 'read') validateReadEvidence(request, evidence)
  if (request.action === 'search') {
    const search = parseProtocol(
      z.object({
        items: z.array(z.unknown()).max(10),
        mode: z.enum(['hybrid', 'lexical_only']),
        truncated: z.boolean(),
      }),
      input,
    )
    for (const item of search.items) {
      if (inspectResponseEvidence(item).citations.length === 0)
        throw new ApiError(
          'protocol',
          'Every search item must contain valid citation evidence.',
        )
    }
  }
}
