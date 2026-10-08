import type { IncomingMessage, ServerResponse } from 'node:http'

export type LabHandler = (
  request: IncomingMessage,
  response: ServerResponse,
  id: string,
) => Promise<void>
