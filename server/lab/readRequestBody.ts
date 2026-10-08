import type { IncomingMessage } from 'node:http'
import { maxBodyBytes } from './maxBodyBytes.ts'

export async function readRequestBody(request: IncomingMessage) {
  const chunks: Buffer[] = []
  let total = 0
  for await (const chunk of request) {
    const buffer = Buffer.from(chunk as Uint8Array)
    total += buffer.length
    if (total > maxBodyBytes) throw new Error('Request body too large')
    chunks.push(buffer)
  }
  return Buffer.concat(chunks).toString('utf8')
}
