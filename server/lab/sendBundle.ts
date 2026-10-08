import type { ServerResponse } from 'node:http'
import { readTranscriptBundle } from './readTranscriptBundle.ts'
import { sendJson } from './sendJson.ts'

export async function sendBundle(response: ServerResponse, id: string) {
  const bundle = await readTranscriptBundle(id)
  if (bundle === null) sendJson(response, 404, { error: 'Not found.' })
  else sendJson(response, 200, bundle)
}
