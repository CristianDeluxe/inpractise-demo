import type { ReactNode } from 'react'

export type ParagraphFrameProps = {
  readonly paragraphId: string
  readonly start: number
  readonly active: boolean
  readonly focused: boolean
  readonly note: string | null
  readonly onSeek: (seconds: number) => void
  readonly children: ReactNode
}
