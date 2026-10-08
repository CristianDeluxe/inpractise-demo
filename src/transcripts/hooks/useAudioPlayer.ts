import { useCallback, useEffect, useRef } from 'react'
import { pauseAtStop } from '../review/pauseAtStop'
import { replayPaddingSeconds } from '../review/replayPaddingSeconds'
import type { TimeInterval } from '../review/TimeInterval'

/** One audio element shared by the whole workspace; seeking also starts playback. */
export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const stopAt = useRef<number | null>(null)
  const seekTo = useCallback(async (seconds: number) => {
    const audio = audioRef.current
    if (!audio) return
    stopAt.current = null
    audio.currentTime = seconds
    try {
      await audio.play()
    } catch {
      // Autoplay can be refused; the position has moved, which is what matters.
    }
  }, [])
  const playSpan = useCallback(
    async (span: TimeInterval) => {
      await seekTo(Math.max(0, span.start - replayPaddingSeconds))
      stopAt.current = span.end + replayPaddingSeconds
    },
    [seekTo],
  )
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onTime = () => {
      if (pauseAtStop(audio, stopAt.current)) stopAt.current = null
    }
    audio.addEventListener('timeupdate', onTime)
    return () => {
      audio.removeEventListener('timeupdate', onTime)
    }
  }, [])
  return { audioRef, seekTo, playSpan }
}
