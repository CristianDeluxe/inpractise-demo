/** Pauses once playback reaches the stop time and reports whether it did. */
export function pauseAtStop(audio: HTMLAudioElement, stopAt: number | null) {
  if (stopAt === null || audio.currentTime < stopAt) return false
  audio.pause()
  return true
}
