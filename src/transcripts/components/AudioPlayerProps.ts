import type { RefObject } from 'react'

export type AudioPlayerProps = {
  readonly src: string
  readonly audioRef: RefObject<HTMLAudioElement | null>
}
