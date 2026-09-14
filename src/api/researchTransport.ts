import { performRequest } from './performRequest.ts'
import { RequestLifecycle } from './RequestLifecycle.ts'
import type { RequestOptions } from './RequestOptions.ts'
import type { ResearchClient } from './ResearchClient.ts'
import type { ResearchRequest } from './ResearchRequest.ts'
import type { ResponseEnvelope } from './ResponseEnvelope.ts'
import { validateRequest } from './validators/validateRequest.ts'

/**
 * A workspace viewing restriction overrides a per-request view before validation.
 * This keeps callers from accidentally escaping the selected demo mode; the
 * backend still owns authorization and independently enforces downgrade rules.
 */
export async function researchTransport<T, A extends ResearchRequest['action']>(
  client: ResearchClient,
  request: ResearchRequest & { action: A },
  validate: (input: unknown) => T,
  options: RequestOptions = {},
): Promise<ResponseEnvelope<T, A>> {
  const lifecycle = new RequestLifecycle(++client.sequence, options)
  const scopedRequest = client.viewAs
    ? { ...request, viewAs: client.viewAs }
    : request
  return lifecycle.start(async () => {
    validateRequest(scopedRequest)
    return performRequest<T, A>(
      client,
      scopedRequest,
      validate,
      lifecycle.controller.signal,
    )
  })
}
