import { ApiError } from './ApiError.ts'
import type { AskData } from './AskData.ts'
import type { AskRequest } from './AskRequest.ts'
import { askStageSchema } from './askStageSchema.ts'
import type { DataParser } from './DataParser.ts'
import { parseActionData } from './parseActionData.ts'
import { parseEnvelope } from './parseEnvelope.ts'
import { parseHttpError } from './parseHttpError.ts'
import { parseProtocol } from './parseProtocol.ts'
import { parseStreamError } from './parseStreamError.ts'
import { readEventStream } from './readEventStream.ts'
import { readResponseBody } from './readResponseBody.ts'
import { RequestLifecycle } from './RequestLifecycle.ts'
import type { ResearchClient } from './ResearchClient.ts'
import type { ResponseEnvelope } from './ResponseEnvelope.ts'
import { sendResearchRequest } from './sendResearchRequest.ts'
import type { StreamAskOptions } from './StreamAskOptions.ts'
import { validateRequest } from './validators/validateRequest.ts'

/**
 * The same question over an event stream. Progress is reported as it arrives
 * and the answer only by the terminal event, which carries the ordinary ask
 * envelope and goes through the ordinary validators. A stream that ends without
 * that event is a protocol failure, never an empty answer.
 */
export async function streamAsk<T extends Record<string, unknown>>(
  client: ResearchClient,
  request: AskRequest,
  parseData: DataParser<AskData<T>>,
  options: StreamAskOptions,
): Promise<ResponseEnvelope<AskData<T>, 'ask'>> {
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
        await readResponseBody(response, 'ask'),
        'ask',
      )
    if (!response.body)
      throw new ApiError('protocol', 'The research service sent no stream.')
    let envelope: ResponseEnvelope<AskData<T>, 'ask'> | undefined
    for await (const frame of readEventStream(response.body)) {
      if (signal.aborted) break
      if (frame.event === 'error') throw parseStreamError(frame.data, 'ask')
      if (frame.event === 'stage') {
        options.onStage(parseProtocol(askStageSchema, frame.data))
        continue
      }
      if (frame.event !== 'result') continue
      if (envelope)
        throw new ApiError('protocol', 'The stream carried two results.')
      envelope = parseEnvelope(frame.data, 'ask', (input) =>
        parseActionData(request, input, parseData),
      )
    }
    if (!envelope)
      throw new ApiError('protocol', 'The stream ended without a result.')
    return envelope
  })
}
