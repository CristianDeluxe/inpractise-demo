import type { ReactNode } from 'react'

export type RailSectionProps = {
  readonly title: string
  /** Accessible name when it should differ from the visible heading. */
  readonly label?: string
  readonly children: ReactNode
}
