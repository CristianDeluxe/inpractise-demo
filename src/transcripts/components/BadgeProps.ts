import type { ReactNode } from 'react'

export type BadgeProps = {
  readonly tone: 'neutral' | 'accent' | 'success' | 'danger'
  readonly children: ReactNode
}
