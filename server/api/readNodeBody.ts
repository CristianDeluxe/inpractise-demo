import type { IncomingMessage } from 'node:http'
import { FacadeError } from './FacadeError.ts'

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
