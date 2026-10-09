import type { ReactNode } from 'react'

export type ParagraphFrameProps = {
  readonly paragraphId: string
  readonly start: number
  /** Side-by-side rows use the full width; every other view keeps a reading measure. */
  readonly wide?: boolean
  readonly active: boolean
  readonly focused: boolean
  readonly note: string | null
  readonly onSeek: (seconds: number) => void
  readonly children: ReactNode
}
