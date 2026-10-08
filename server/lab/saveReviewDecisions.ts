import type { IncomingMessage, ServerResponse } from 'node:http'
import { readRequestBody } from './readRequestBody.ts'
import { reviewDecisionsSchema } from './reviewDecisionsSchema.ts'
import { sendJson } from './sendJson.ts'
import { writeReviewDecisions } from './writeReviewDecisions.ts'

export async function saveReviewDecisions(
  request: IncomingMessage,
  response: ServerResponse,
  id: string,
) {
  let body: unknown
  try {
    body = JSON.parse(await readRequestBody(request)) as unknown
  } catch {
    sendJson(response, 400, { error: 'Body must be JSON under 1 MB.' })
    return
  }
  const parsed = reviewDecisionsSchema.safeParse(body)
  if (!parsed.success) {
    sendJson(response, 400, { error: 'Body is not a ReviewDecision array.' })
    return
  }
  await writeReviewDecisions(id, parsed.data)
  sendJson(response, 200, parsed.data)
}
