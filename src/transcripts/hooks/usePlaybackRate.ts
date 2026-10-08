import { useState, type RefObject } from 'react'
import { nextPlaybackRate } from '../review/nextPlaybackRate'
import { nudgePlayback } from '../review/nudgePlayback'
import { nudgeSeconds } from '../review/nudgeSeconds'

/** Speed, speed cycling and the two-second jumps for one audio element. */
export function usePlaybackRate(audioRef: RefObject<HTMLAudioElement | null>) {
  const [rate, setRate] = useState(1)
  const cycle = () => {
    const next = nextPlaybackRate(rate)
    if (audioRef.current) audioRef.current.playbackRate = next
    setRate(next)
  }
  const back = () => {
    nudgePlayback(audioRef.current, -nudgeSeconds)
  }
  const forward = () => {
    nudgePlayback(audioRef.current, nudgeSeconds)
  }
  return { rate, cycle, back, forward }
}
