/** Plays a paused element and pauses a playing one; a refused autoplay leaves it paused. */
export async function togglePlayback(audio: HTMLAudioElement | null) {
  if (!audio) return
  if (!audio.paused) {
    audio.pause()
    return
  }
  try {
    await audio.play()
  } catch {
    // The browser refused playback; the button stays in its paused state.
  }
}
