import type { Transport } from '@modelcontextprotocol/sdk/shared/transport.js'
import { appendFileSync } from 'node:fs'

/**
 * Records the negotiated protocol version and the client that connected, taken
 * from the initialize response the server actually sent. An example transcript
 * is not evidence that a client connected; this is.
 */
export function recordHandshake(
  transport: Transport,
  path: string | undefined,
): void {
  const send = transport.send.bind(transport)
  transport.send = async (message, options) => {
    const result = (message as { result?: { protocolVersion?: string } }).result
    if (result?.protocolVersion) {
      const line = JSON.stringify({
        at: new Date().toISOString(),
        protocolVersion: result.protocolVersion,
      })
      process.stderr.write(`handshake ${line}\n`)
      if (path) appendFileSync(path, `${line}\n`)
    }
    return send(message, options)
  }
}
