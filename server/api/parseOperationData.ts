import type { ResearchRequest } from '@/api/ResearchRequest.ts'
import type { BackendResult } from './BackendResult.ts'
import { FacadeError } from './FacadeError.ts'
import type { matchOperation } from './matchOperation.ts'
import { projectResponse } from './projectResponse.ts'

export function parseOperationData(
  route: ReturnType<typeof matchOperation>,
  payload: ResearchRequest,
  backend: BackendResult,
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
