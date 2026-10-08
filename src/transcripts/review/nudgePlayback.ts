/** Moves the playhead by the given seconds, clamped to the start and the end. */
export function nudgePlayback(audio: HTMLAudioElement | null, seconds: number) {
  if (!audio) return
  const end = Number.isFinite(audio.duration) ? audio.duration : Infinity
  audio.currentTime = Math.min(Math.max(audio.currentTime + seconds, 0), end)
}
