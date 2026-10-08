import { useCallback, useRef, useState } from 'react'
import { paddedSpan } from '../review/paddedSpan'
import { startPlayback } from '../review/startPlayback'
import type { TimeInterval } from '../review/TimeInterval'
import { useStopAndLoop } from './useStopAndLoop'

/**
 * One audio element shared by the whole workspace; seeking also starts
 * playback. A replay stops after the edit; a loop repeats it until stopped.
 * Stop and loop are set before awaiting play, so an earlier call that
 * resolves late cannot overwrite the one that superseded it.
 */
export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const stopAt = useRef<number | null>(null)
  const loop = useRef<TimeInterval | null>(null)
  const [looping, setLooping] = useState(false)
  const play = useCallback(
    async (
      seconds: number,
      stop: number | null,
      repeat: TimeInterval | null,
    ) => {
      const audio = audioRef.current
      if (!audio) return
      stopAt.current = stop
      loop.current = repeat
      setLooping(repeat !== null)
      await startPlayback(audio, seconds)
    },
    [],
  )
  const seekTo = useCallback(
    async (seconds: number) => play(seconds, null, null),
    [play],
  )
  const playSpan = useCallback(
    async (span: TimeInterval) => {
      const padded = paddedSpan(span)
      await play(padded.start, padded.end, null)
    },
    [play],
  )
  const loopSpan = useCallback(
    async (span: TimeInterval) => {
      const padded = paddedSpan(span)
      await play(padded.start, null, padded)
    },
    [play],
  )
  const stopLoop = useCallback(() => {
    loop.current = null
    setLooping(false)
  }, [])
  useStopAndLoop(audioRef, stopAt, loop)
  return { audioRef, seekTo, playSpan, loopSpan, stopLoop, looping }
}
