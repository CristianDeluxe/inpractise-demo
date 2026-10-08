import type { TimeInterval } from './TimeInterval'

/** Jumps back to the loop's start once playback passes its end; reports whether it did. */
export function loopBack(audio: HTMLAudioElement, loop: TimeInterval | null) {
  if (loop === null || audio.currentTime < loop.end) return false
  audio.currentTime = loop.start
  return true
}
