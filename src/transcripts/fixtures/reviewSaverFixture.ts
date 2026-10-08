import { vi } from 'vitest'
import type { ReviewSaver } from '../api/ReviewSaver'

/** A saver that succeeds at once and records each call. */
export function reviewSaverFixture() {
  return vi.fn<ReviewSaver>(async () => Promise.resolve())
}
