import type { IncomingMessage } from 'node:http'
import { FacadeError } from './FacadeError.ts'

/**
 * Count bytes while consuming the stream instead of trusting Content-Length.
 * The limit therefore also applies to chunked bodies and is checked before the
 * next chunk is retained for JSON parsing.
 */
export async function readNodeBody(
  request: IncomingMessage,
): Promise<string | undefined> {
  if (request.method === 'GET' || request.method === 'HEAD') return undefined
  let size = 0
  const chunks: Buffer[] = []
  for await (const chunk of request) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk))
    size += buffer.byteLength
    if (size > 16384)
      throw new FacadeError(
        413,
        'body_too_large',
        'Request body exceeds 16384 bytes.',
      )
    chunks.push(buffer)
  }
  return Buffer.concat(chunks).toString('utf8')
}
