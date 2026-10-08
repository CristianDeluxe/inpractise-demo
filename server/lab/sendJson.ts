import type { ServerResponse } from 'node:http'

export function sendJson(
  response: ServerResponse,
  status: number,
  body: unknown,
) {
  response.statusCode = status
  response.setHeader('content-type', 'application/json; charset=utf-8')
  response.setHeader('cache-control', 'no-store')
  response.end(JSON.stringify(body))
}
