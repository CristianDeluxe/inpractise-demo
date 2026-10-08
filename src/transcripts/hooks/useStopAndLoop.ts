import { useEffect, type RefObject } from 'react'
import { loopBack } from '../review/loopBack'
import { pauseAtStop } from '../review/pauseAtStop'
import type { TimeInterval } from '../review/TimeInterval'

/** On every time update: jump back inside a loop, or pause at a replay's stop. */
export function useStopAndLoop(
  audioRef: RefObject<HTMLAudioElement | null>,
  stopAt: RefObject<number | null>,
  loop: RefObject<TimeInterval | null>,
) {
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onTime = () => {
      if (loopBack(audio, loop.current)) return
      if (pauseAtStop(audio, stopAt.current)) stopAt.current = null
    }
    audio.addEventListener('timeupdate', onTime)
    return () => {
      audio.removeEventListener('timeupdate', onTime)
    }
  }, [audioRef, loop, stopAt])
}
