import type { ReactNode } from 'react'
import type { TranscriptBundle } from '../api/TranscriptBundle'

export type ReviewWorkspaceProps = {
  readonly bundle: TranscriptBundle
  /** Lab navigation, supplied by the routed page so the workspace renders without a router. */
  readonly nav?: ReactNode
}
