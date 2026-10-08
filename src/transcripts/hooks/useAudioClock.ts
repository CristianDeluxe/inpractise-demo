import { useEffect, useState, type RefObject } from 'react'
import type { AudioClock } from '../review/AudioClock'

/** Playback position, length and state; follows animation frames while playing. */
export function useAudioClock(
  audioRef: RefObject<HTMLAudioElement | null>,
  fallbackDuration: number,
): AudioClock {
  const [clock, setClock] = useState<AudioClock>({
    currentTime: 0,
    duration: fallbackDuration,
    playing: false,
  })
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    let frame = 0
    const read = () => {
      setClock({
        currentTime: audio.currentTime,
        duration: Number.isFinite(audio.duration)
          ? audio.duration
          : fallbackDuration,
        playing: !audio.paused,
      })
    }
    const tick = () => {
      read()
      if (!audio.paused) frame = requestAnimationFrame(tick)
    }
    const events = [
      'play',
      'pause',
      'seeked',
      'timeupdate',
      'loadedmetadata',
      'ended',
    ]
    const onEvent = () => {
      cancelAnimationFrame(frame)
      tick()
    }
    for (const name of events) audio.addEventListener(name, onEvent)
    return () => {
      cancelAnimationFrame(frame)
      for (const name of events) audio.removeEventListener(name, onEvent)
    }
  }, [audioRef, fallbackDuration])
  return clock
}
