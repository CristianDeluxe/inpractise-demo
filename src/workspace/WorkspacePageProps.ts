import type { ReactNode } from 'react'

export type WorkspacePageProps = {
  readonly eyebrow: string
  readonly title: string
  /** A readable paragraph under the title. */
  readonly intro?: string
  /** The compact source note, when the page shows transcript material. */
  readonly note?: ReactNode
  readonly children: ReactNode
}
