import type { IncomingMessage, ServerResponse } from 'node:http'
import { handleLabRequest } from './handleLabRequest.ts'

export async function respondToLabRequest(
  request: IncomingMessage,
  response: ServerResponse,
  continueChain: () => void,
) {
  try {
    if (!(await handleLabRequest(request, response))) continueChain()
  } catch (error) {
    response.statusCode = 500
    response.end(error instanceof Error ? error.message : 'Error')
  }
}
