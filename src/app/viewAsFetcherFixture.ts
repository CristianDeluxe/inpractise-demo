import type { Mock } from 'vitest'
import { responseFixture } from './responseFixture'
import { viewAsPayloadFixture } from './viewAsPayloadFixture'

/** Answers every request with a payload shaped by the request's own viewAs. */
export function viewAsFetcherFixture(
  fetcher: Mock<typeof fetch>,
  requests: Record<string, unknown>[],
) {
  fetcher.mockImplementation(async (_url, init) => {
    const request = JSON.parse(
      typeof init?.body === 'string' ? init.body : '{}',
    ) as Record<string, unknown>
    requests.push(request)
    return Promise.resolve(
      responseFixture(String(request['action']), viewAsPayloadFixture(request)),
    )
  })
}
