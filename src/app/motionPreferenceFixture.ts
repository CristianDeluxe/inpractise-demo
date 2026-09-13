import { vi } from 'vitest'

export function motionPreferenceFixture(reduced = false) {
  const events = new EventTarget()
  const preference = {
    get matches() {
      return reduced
    },
    addEventListener: events.addEventListener.bind(events),
    removeEventListener: events.removeEventListener.bind(events),
  }
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => preference),
  )
  return (next: boolean) => {
    reduced = next
    events.dispatchEvent(new Event('change'))
  }
}
