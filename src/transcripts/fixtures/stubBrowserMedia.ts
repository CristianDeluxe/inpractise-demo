import { vi } from 'vitest'

/** jsdom implements neither media playback nor scrolling. */
export function stubBrowserMedia() {
  vi.stubGlobal('scrollTo', vi.fn())
  Element.prototype.scrollIntoView = vi.fn()
  vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined)
}
