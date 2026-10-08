import type { LabHandler } from './LabHandler.ts'
import type { LabRoute } from './LabRoute.ts'
import { listTranscriptSummaries } from './listTranscriptSummaries.ts'
import { readMemoryOverview } from './readMemoryOverview.ts'
import { saveReviewDecisions } from './saveReviewDecisions.ts'
import { sendBundle } from './sendBundle.ts'
import { sendJson } from './sendJson.ts'
import { streamAudio } from './streamAudio.ts'

export const labHandlers: Record<LabRoute['kind'], LabHandler> = {
  list: async (_request, response) => {
    sendJson(response, 200, await listTranscriptSummaries())
  },
  memory: async (_request, response) => {
    sendJson(response, 200, await readMemoryOverview())
  },
  bundle: async (_request, response, id) => {
    await sendBundle(response, id)
  },
  review: saveReviewDecisions,
  audio: streamAudio,
  'invalid-id': async (_request, response) => {
    sendJson(response, 400, { error: 'Invalid transcript id.' })
    return Promise.resolve()
  },
  'method-not-allowed': async (_request, response) => {
    sendJson(response, 405, { error: 'Method not allowed.' })
    return Promise.resolve()
  },
}
