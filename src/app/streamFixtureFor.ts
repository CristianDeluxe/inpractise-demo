import { askStreamFixture } from './askStreamFixture'
import { investigateStreamFixture } from './investigateStreamFixture'

/** Picks the streamed-response fixture that matches the action under test. */
export function streamFixtureFor(action: string, data: unknown) {
  if (action === 'investigate') return investigateStreamFixture(data)
  return askStreamFixture(data)
}
