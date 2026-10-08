import type { RefObject } from 'react'
import { nudgePlayback } from './nudgePlayback'
import { nudgeSeconds } from './nudgeSeconds'
import { togglePlayback } from './togglePlayback'

/** The keys that drive the player directly. */
export function playbackKeyHandlers(
  audioRef: RefObject<HTMLAudioElement | null>,
) {
  return {
    togglePlay: () => {
      void togglePlayback(audioRef.current)
    },
    back: () => {
      nudgePlayback(audioRef.current, -nudgeSeconds)
    },
    forward: () => {
      nudgePlayback(audioRef.current, nudgeSeconds)
    },
  }
}
