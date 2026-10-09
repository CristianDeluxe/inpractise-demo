import { createContext, type RefObject } from 'react'

/** The episode's audio element, for the few readers that follow playback inside a paragraph. */
export const AudioRefContext =
  createContext<RefObject<HTMLAudioElement | null> | null>(null)
