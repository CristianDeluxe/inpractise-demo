import type { TranscriptParagraph } from '../contracts/TranscriptParagraph'
import type { ReviewWorkspaceState } from '../hooks/ReviewWorkspaceState'
import type { WorkspaceLayout } from '../hooks/WorkspaceLayout'

export type ReviewColumnsProps = {
  readonly paragraphs: readonly TranscriptParagraph[]
  readonly ws: ReviewWorkspaceState
  readonly layout: WorkspaceLayout
  /** True when the edit inspector is shown in the reliability rail instead. */
  readonly inspectorInRail: boolean
}
