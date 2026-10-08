import { mixedLibraryPayloadFixture } from './mixedLibraryPayloadFixture'
import { responseFixture } from './responseFixture'
import { uiPayloadFixture } from './uiPayloadFixture'
import { uiRuntimeFixture } from './uiRuntimeFixture'

/** A signed-in runtime whose authorized list mixes interviews and a filing. */
export function mixedLibraryRuntimeFixture(role: 'reviewer' | 'member') {
  const fixture = uiRuntimeFixture()
  fixture.fetcher.mockImplementation(async (_url, init) => {
    const action = String(
      (
        JSON.parse(typeof init?.body === 'string' ? init.body : '{}') as Record<
          string,
          unknown
        >
      )['action'],
    )
    if (action === 'list')
      return Promise.resolve(
        responseFixture(action, mixedLibraryPayloadFixture()),
      )
    if (action === 'me')
      return Promise.resolve(
        responseFixture(action, {
          orgId: 'demo-org',
          role,
          premium: true,
          noteCount: 0,
        }),
      )
    return Promise.resolve(responseFixture(action, uiPayloadFixture(action)))
  })
  return fixture
}
