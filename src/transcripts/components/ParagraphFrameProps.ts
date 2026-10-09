import type { ReactNode } from 'react'

export type ParagraphFrameProps = {
  readonly paragraphId: string
  readonly start: number
  readonly focused: boolean
  readonly children: ReactNode
}
