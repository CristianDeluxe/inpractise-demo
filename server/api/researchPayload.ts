import type { ResearchRequest } from '@/api/ResearchRequest.ts'
import { validateRequest } from '@/api/validators/validateRequest.ts'
import type { matchOperation } from './matchOperation.ts'

export function researchPayload(
  route: ReturnType<typeof matchOperation>,
  input: Record<string, unknown>,
): ResearchRequest {
  const fields = Object.fromEntries(
    Object.entries(input).filter(
      ([key]) => key !== 'cursor' && key !== 'pageSize',
    ),
  )
  const payload = {
    action: route.operation.action,
    ...fields,
  } as ResearchRequest
  validateRequest(payload)
  return payload
}
