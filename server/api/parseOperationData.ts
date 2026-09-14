import type { ResearchRequest } from '@/api/ResearchRequest.ts'
import { FacadeError } from './FacadeError.ts'
import type { matchOperation } from './matchOperation.ts'
import { projectResponse } from './projectResponse.ts'

export function parseOperationData(
  route: ReturnType<typeof matchOperation>,
  payload: ResearchRequest,
  backend: { data: unknown; requestId: string },
  input: Record<string, unknown>,
) {
  try {
    return route.operation.output.parse(
      projectResponse(payload, backend.data, input),
    )
  } catch (cause) {
    if (cause instanceof FacadeError) throw cause
    throw new FacadeError(
      502,
      'invalid_backend_response',
      'Research evidence failed validation.',
      { requestId: backend.requestId },
    )
  }
}
