import { ApiError } from './ApiError.ts'
import { parseActionData } from './parseActionData.ts'
import { parseEnvelope } from './parseEnvelope.ts'
import { parseHttpError } from './parseHttpError.ts'
import { parseProtocol } from './parseProtocol.ts'
import { parseStreamError } from './parseStreamError.ts'
import { readEventStream } from './readEventStream.ts'
import { readResponseBody } from './readResponseBody.ts'
import { RequestLifecycle } from './RequestLifecycle.ts'
import type { ResearchClient } from './ResearchClient.ts'
import type { ResearchRequest } from './ResearchRequest.ts'
import type { ResponseEnvelope } from './ResponseEnvelope.ts'
import { sendResearchRequest } from './sendResearchRequest.ts'
import type { StreamContract } from './StreamContract.ts'
import type { StreamOptions } from './StreamOptions.ts'
import { validateRequest } from './validators/validateRequest.ts'

/**
 * One action over an event stream. Progress is reported as it arrives and the
 * data only by the terminal event, which carries the ordinary envelope and goes
 * through the ordinary validators. A stream that ends without that event is a
 * protocol failure, never an empty result.
 */
export async function streamRequest<
  T extends Record<string, unknown>,
  A extends 'ask' | 'compare',
  S,
>(
  client: ResearchClient,
  request: ResearchRequest & { action: A },
  contract: StreamContract<T, S>,
  options: StreamOptions<S>,
): Promise<ResponseEnvelope<T, A>> {
  const lifecycle = new RequestLifecycle(++client.sequence, options)
  const scoped = client.viewAs ? { ...request, viewAs: client.viewAs } : request
  return lifecycle.start(async () => {
    validateRequest(scoped)
    const signal = lifecycle.controller.signal
    const response = await sendResearchRequest(
      client,
      { ...scoped, stream: true },
      signal,
    )
    if (!response.ok)
      throw parseHttpError(
        response.status,
        await readResponseBody(response, request.action),
        request.action,
      )
    if (!response.body)
      throw new ApiError('protocol', 'The research service sent no stream.')
    let envelope: ResponseEnvelope<T, A> | undefined
    for await (const frame of readEventStream(response.body)) {
      if (signal.aborted) break
      if (frame.event === 'error')
        throw parseStreamError(frame.data, request.action)
      if (frame.event === 'stage') {
        options.onStage(parseProtocol(contract.stageSchema, frame.data))
        continue
      }
      if (frame.event !== 'result') continue
      if (envelope)
        throw new ApiError('protocol', 'The stream carried two results.')
      envelope = parseEnvelope(frame.data, request.action, (input) =>
        parseActionData(request, input, contract.parseData),
      )
    }
    if (!envelope)
      throw new ApiError('protocol', 'The stream ended without a result.')
    return envelope
  })
}
