import { meOutput } from '@/http-api/meOutput.ts'
import { callBackend } from './callBackend.ts'
import type { FacadeConfig } from './FacadeConfig.ts'
import { FacadeError } from './FacadeError.ts'
import type { OperationContext } from './OperationContext.ts'
import { requireBearer } from './requireBearer.ts'

export async function authorizeCaller(
  config: FacadeConfig,
  context: OperationContext,
) {
  const authorization = requireBearer(context.request)
  const identity = await callBackend(config, {
    authorization,
    correlationId: context.correlationId,
    payload: { action: 'me' },
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
