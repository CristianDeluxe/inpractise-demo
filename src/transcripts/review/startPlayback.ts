/** Moves the playhead and plays; a refused autoplay still leaves the position moved. */
export async function startPlayback(audio: HTMLAudioElement, seconds: number) {
  audio.currentTime = seconds
  try {
    await audio.play()
  } catch {
    // Autoplay can be refused; the position has moved, which is what matters.
  }
}
