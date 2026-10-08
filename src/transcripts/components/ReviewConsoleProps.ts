import type { RefObject } from 'react'
import type { AudioPlayerProps } from './AudioPlayerProps'
import type { ReviewToolbarProps } from './ReviewToolbarProps'

export type ReviewConsoleProps = {
  readonly toolbar: ReviewToolbarProps
  readonly audio: AudioPlayerProps
  readonly consoleRef: RefObject<HTMLDivElement | null>
}
