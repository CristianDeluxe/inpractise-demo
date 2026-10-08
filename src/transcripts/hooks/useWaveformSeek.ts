import type { KeyboardEvent, PointerEvent, RefObject } from 'react'
import { pointerRatio } from '../review/pointerRatio'
import { seekKeyTarget } from '../review/seekKeyTarget'

/** Click or drag on the waveform to move the playhead; arrows, Home and End from the keyboard. */
export function useWaveformSeek(
  audioRef: RefObject<HTMLAudioElement | null>,
  duration: number,
) {
  const seekTo = (seconds: number) => {
    const audio = audioRef.current
    if (audio && duration > 0) audio.currentTime = seconds
  }
  const fromPointer = (event: PointerEvent<HTMLElement>) => {
    seekTo(pointerRatio(event.clientX, event.currentTarget) * duration)
  }
  return {
    onPointerDown: (event: PointerEvent<HTMLElement>) => {
      event.currentTarget.setPointerCapture(event.pointerId)
      fromPointer(event)
    },
    onPointerMove: (event: PointerEvent<HTMLElement>) => {
      if (event.currentTarget.hasPointerCapture(event.pointerId))
        fromPointer(event)
    },
    onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
      const current = audioRef.current?.currentTime ?? 0
      const target = seekKeyTarget(event.key, current, duration)
      if (target === null) return
      event.preventDefault()
      seekTo(target)
    },
  }
}
