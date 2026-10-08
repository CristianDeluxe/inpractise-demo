import type { IncomingMessage } from 'node:http'
import { loopbackAddresses } from './loopbackAddresses.ts'

/** True when the request comes from this machine, whatever host Vite listens on. */
export function isLoopbackRequest(request: IncomingMessage): boolean {
  return loopbackAddresses.has(request.socket.remoteAddress ?? '')
}
