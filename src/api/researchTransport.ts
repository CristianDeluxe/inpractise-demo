import { performRequest } from './performRequest.ts'
import { RequestLifecycle } from './RequestLifecycle.ts'
import type { RequestOptions } from './RequestOptions.ts'
import type { ResearchClient } from './ResearchClient.ts'
import type { ResearchRequest } from './ResearchRequest.ts'
import type { ResponseEnvelope } from './ResponseEnvelope.ts'
import { validateRequest } from './validators/validateRequest.ts'

export async function researchTransport<T, A extends ResearchRequest['action']>(
  client: ResearchClient,
  request: ResearchRequest & { action: A },
  validate: (input: unknown) => T,
  options: RequestOptions = {},
): Promise<ResponseEnvelope<T, A>> {
  const lifecycle = new RequestLifecycle(++client.sequence, options)
  return lifecycle.start(async () => {
    validateRequest(request)
    return performRequest<T, A>(
      client,
      request,
      validate,
      lifecycle.controller.signal,
    )
  })
}
