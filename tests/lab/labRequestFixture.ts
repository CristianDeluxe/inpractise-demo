import type { IncomingHttpHeaders, IncomingMessage } from 'node:http'

export function labRequestFixture(
  remoteAddress: string | undefined,
  headers: IncomingHttpHeaders,
): IncomingMessage {
  return { socket: { remoteAddress }, headers } as unknown as IncomingMessage
}
