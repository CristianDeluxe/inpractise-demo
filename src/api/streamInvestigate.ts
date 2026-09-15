import { ApiError } from './ApiError.ts'
import type { DataParser } from './DataParser.ts'
import type { InvestigateData } from './InvestigateData.ts'
import type { InvestigateRequest } from './InvestigateRequest.ts'
import { investigateStageSchema } from './investigateStageSchema.ts'
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
import type { StreamInvestigateOptions } from './StreamInvestigateOptions.ts'
import { validateRequest } from './validators/validateRequest.ts'

/**
 * The bounded research loop over an event stream. Progress is reported as
 * each phase completes and the grounded result only by the terminal event,
 * which goes through the ordinary evidence validators. A stream that ends
 * without that event is a protocol failure, never an empty result.
 */
export async function streamInvestigate<T extends Record<string, unknown>>(
  client: ResearchClient,
  request: InvestigateRequest,
  parseData: DataParser<InvestigateData<T>>,
  options: StreamInvestigateOptions,
): Promise<ResponseEnvelope<InvestigateData<T>, 'investigate'>> {
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
        await readResponseBody(response, 'investigate'),
        'investigate',
      )
    if (!response.body)
      throw new ApiError('protocol', 'The research service sent no stream.')
    let envelope:
      ResponseEnvelope<InvestigateData<T>, 'investigate'> | undefined
    for await (const frame of readEventStream(response.body)) {
      if (signal.aborted) break
      if (frame.event === 'error')
        throw parseStreamError(frame.data, 'investigate')
      if (frame.event === 'stage') {
        options.onStage(parseProtocol(investigateStageSchema, frame.data))
        continue
      }
      if (frame.event !== 'result') continue
      if (envelope)
        throw new ApiError('protocol', 'The stream carried two results.')
      envelope = parseEnvelope(frame.data, 'investigate', (input) =>
        parseActionData(request, input, parseData),
      )
    }
    if (!envelope)
      throw new ApiError('protocol', 'The stream ended without a result.')
    return envelope
  })
}
