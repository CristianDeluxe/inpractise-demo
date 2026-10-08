import { useCallback, useRef } from 'react'

/** One audio element shared by the whole workspace; seeking also starts playback. */
export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const seekTo = useCallback(async (seconds: number) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = seconds
    try {
      await audio.play()
    } catch {
      // Autoplay can be refused; the position has moved, which is what matters.
    }
  }, [])
  return { audioRef, seekTo }
}
