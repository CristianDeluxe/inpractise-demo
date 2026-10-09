import type { BeaconEvent } from './BeaconEvent'

/** Posts one analytics event to the origin; failures are ignored. */
export function sendBeacon(event: BeaconEvent) {
  try {
    const body = new Blob([JSON.stringify(event)], { type: 'application/json' })
    navigator.sendBeacon('/beacon', body)
  } catch {
    // Analytics never affects the page.
  }
}
