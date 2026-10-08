import type { IncomingMessage } from 'node:http'
import { hostnameOf } from './hostnameOf.ts'
import { localHostnames } from './localHostnames.ts'
import { loopbackAddresses } from './loopbackAddresses.ts'

/**
 * True only for a browser on this machine talking straight to Vite: a
 * loopback peer, a local Host header (which also stops DNS rebinding), and no
 * forwarding headers, since a local reverse proxy would make every remote
 * caller look like loopback.
 */
export function isLoopbackRequest(request: IncomingMessage): boolean {
  const { headers } = request
  return (
    loopbackAddresses.has(request.socket.remoteAddress ?? '') &&
    localHostnames.has(hostnameOf(headers.host)) &&
    headers['x-forwarded-for'] === undefined &&
    headers.forwarded === undefined
  )
}
