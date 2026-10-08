import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { join } from 'node:path'
import { parseByteRange } from './parseByteRange.ts'
import { transcriptFolder } from './transcriptFolder.ts'

/** Serves audio.m4a with Range support so the player can seek. */
export async function streamAudio(
  request: IncomingMessage,
  response: ServerResponse,
  id: string,
) {
  const path = join(transcriptFolder(id), 'audio.m4a')
  const size = await stat(path).then(
    (info) => info.size,
    () => null,
  )
  if (size === null) {
    response.statusCode = 404
    response.end()
    return
  }
  response.setHeader('content-type', 'audio/mp4')
  response.setHeader('accept-ranges', 'bytes')
  const range = parseByteRange(request.headers.range, size)
  if (request.headers.range !== undefined && range === null) {
    response.statusCode = 416
    response.setHeader('content-range', `bytes */${String(size)}`)
    response.end()
    return
  }
  const { start, end } = range ?? { start: 0, end: size - 1 }
  response.statusCode = range === null ? 200 : 206
  if (range !== null) {
    response.setHeader(
      'content-range',
      `bytes ${String(start)}-${String(end)}/${String(size)}`,
    )
  }
  response.setHeader('content-length', String(end - start + 1))
  createReadStream(path, { start, end }).pipe(response)
}
