import type { ServerResponse } from 'node:http'

export async function writeNodeResponse(
  response: Response,
  target: ServerResponse,
): Promise<void> {
  target.writeHead(response.status, Object.fromEntries(response.headers))
  target.end(Buffer.from(await response.arrayBuffer()))
}
