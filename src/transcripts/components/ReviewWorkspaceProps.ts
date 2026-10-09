import type { ReviewSaver } from '../api/ReviewSaver'
import type { TranscriptBundle } from '../api/TranscriptBundle'

export type ReviewWorkspaceProps = {
  readonly bundle: TranscriptBundle
  /** Null for a reader without reviewer access: decisions are not recorded. */
  readonly onSave: ReviewSaver | null
}
