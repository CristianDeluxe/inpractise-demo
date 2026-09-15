import { vi } from 'vitest'
import { z } from 'zod'
import { streamFixtureFor } from './streamFixtureFor'
import { uiPayloadFixture } from './uiPayloadFixture'

/** The fetch stub every UI runtime fixture shares: records each request body
 *  and answers it with the fixture payload for its action, streamed or not. */
export function uiFetcherFixture(requests: Record<string, unknown>[]) {
  return vi.fn<typeof fetch>(async (_url, init) => {
    const body = typeof init?.body === 'string' ? init.body : '{}'
    const request = z.record(z.string(), z.unknown()).parse(JSON.parse(body))
    requests.push(request)
    const action = String(request['action'])
    const data = uiPayloadFixture(action)
    if (request['stream'] === true)
      return Promise.resolve(streamFixtureFor(action, data))
    return Promise.resolve(
      new Response(
        JSON.stringify({
          action: request['action'],
          data,
          buildId: 'build-test',
          requestId: 'request-test',
        }),
        { headers: { 'content-type': 'application/json' } },
      ),
    )
  })
}
