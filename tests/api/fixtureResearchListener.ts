import type { IncomingMessage, ServerResponse } from 'node:http'
import { readNodeBody } from '../../server/api/readNodeBody.ts'
import { writeNodeResponse } from '../../server/api/writeNodeResponse.ts'
import { fixtureResearchResponse } from './fixtureResearchResponse.ts'

export async function fixtureResearchListener(
  request: IncomingMessage,
  response: ServerResponse,
): Promise<void> {
  try {
    const body = await readNodeBody(request)
    await writeNodeResponse(
      fixtureResearchResponse(
        JSON.parse(body ?? '{}'),
        request.headers.authorization,
      ),
      response,
    )
  } catch {
    response.writeHead(400)
    response.end()
  }
}
