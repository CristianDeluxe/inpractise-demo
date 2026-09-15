import { vi } from 'vitest'
import { z } from 'zod'
import { askStreamFixture } from './askStreamFixture'
import { investigateStreamFixture } from './investigateStreamFixture'
import { uiPayloadFixture } from './uiPayloadFixture'

/** Records every request body and replies with the fixture shaped for its
 * action: an event stream for a streamed action, an ordinary JSON envelope
 * otherwise. */
export function uiFetcherFixture(requests: Record<string, unknown>[]) {
  return vi.fn<typeof fetch>(async (_url, init) => {
    const body = typeof init?.body === 'string' ? init.body : '{}'
    const request = z.record(z.string(), z.unknown()).parse(JSON.parse(body))
    requests.push(request)
    if (request['stream'] === true)
      return Promise.resolve(
        request['action'] === 'investigate'
          ? investigateStreamFixture(uiPayloadFixture('investigate'))
          : askStreamFixture(uiPayloadFixture(String(request['action']))),
      )
    return Promise.resolve(
      new Response(
        JSON.stringify({
          action: request['action'],
          data: uiPayloadFixture(String(request['action'])),
          buildId: 'build-test',
          requestId: 'request-test',
        }),
        { headers: { 'content-type': 'application/json' } },
      ),
    )
  })
}
