import { parseEnvelope } from './parseEnvelope.ts'
import { parseHttpError } from './parseHttpError.ts'
import { readResponseBody } from './readResponseBody.ts'
import type { ResearchClient } from './ResearchClient.ts'
import type { ResearchRequest } from './ResearchRequest.ts'
import type { ResponseEnvelope } from './ResponseEnvelope.ts'
import { sendResearchRequest } from './sendResearchRequest.ts'
import { throwIfCancelled } from './throwIfCancelled.ts'

/** One request, one JSON envelope, bound to the action that was asked for. */
export async function performRequest<T, A extends ResearchRequest['action']>(
  client: ResearchClient,
  request: ResearchRequest & { action: A },
  validate: (input: unknown) => T,
  signal: AbortSignal,
): Promise<ResponseEnvelope<T, A>> {
  const response = await sendResearchRequest(client, request, signal)
  const body = await readResponseBody(response, request.action)
  throwIfCancelled(signal)
  if (!response.ok) throw parseHttpError(response.status, body, request.action)
  return parseEnvelope(body, request.action, validate)
}
