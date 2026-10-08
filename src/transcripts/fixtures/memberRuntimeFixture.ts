import { uiRuntimeFixture } from '@/app/uiRuntimeFixture'

/** The UI runtime for a signed-in member who is not a reviewer. */
export function memberRuntimeFixture(lab: typeof fetch) {
  const fixture = uiRuntimeFixture(lab)
  fixture.fetcher.mockImplementation(async () =>
    Promise.resolve(
      new Response(
        JSON.stringify({
          action: 'me',
          data: { orgId: 'demo-org', role: 'member', premium: false },
          buildId: 'build-test',
          requestId: 'request-test',
        }),
        { headers: { 'content-type': 'application/json' } },
      ),
    ),
  )
  return fixture
}
