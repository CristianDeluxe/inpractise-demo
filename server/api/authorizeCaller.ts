import type { ViewAs } from '@/api/ViewAs.ts'
import { meOutput } from '@/http-api/meOutput.ts'
import { callBackend } from './callBackend.ts'
import type { FacadeConfig } from './FacadeConfig.ts'
import { FacadeError } from './FacadeError.ts'
import type { OperationContext } from './OperationContext.ts'
import { requireBearer } from './requireBearer.ts'

/**
 * The backend must accept this exact bearer before quota identity is decoded.
 * Viewing restrictions travel with `me`, but its organization is not a cache
 * scope for a later read: membership can change between the two requests.
 */
export async function authorizeCaller(
  config: FacadeConfig,
  context: OperationContext,
  viewAs?: ViewAs,
) {
  const authorization = requireBearer(context.request)
  const identity = await callBackend(config, {
    authorization,
    correlationId: context.correlationId,
    payload: { action: 'me', ...(viewAs ? { viewAs } : {}) },
  })
  try {
    meOutput.parse(identity.data)
  } catch {
    throw new FacadeError(
      502,
      'invalid_backend_response',
      'Research identity failed validation.',
      { requestId: identity.requestId },
    )
  }
  return { authorization, identity }
}
