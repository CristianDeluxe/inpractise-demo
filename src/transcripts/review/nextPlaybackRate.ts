import { playbackRates } from './playbackRates'

/** The speed after the current one; an unknown speed falls back to normal. */
export function nextPlaybackRate(current: number): number {
  const index = playbackRates.indexOf(current)
  if (index === -1) return 1
  return playbackRates[(index + 1) % playbackRates.length] ?? 1
}
