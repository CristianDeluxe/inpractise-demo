import { askStreamFixture } from './askStreamFixture'
import { compareStreamFixture } from './compareStreamFixture'

/** Picks the streamed-response fixture that matches the action under test. */
export function streamFixtureFor(action: string, data: unknown) {
  if (action === 'compare') return compareStreamFixture(data)
  return askStreamFixture(data)
}
