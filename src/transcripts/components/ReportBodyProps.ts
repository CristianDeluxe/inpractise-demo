import type { ScoredParagraph } from '../reliability/ScoredParagraph'
import type { SpeakerLabels } from '../speakers/SpeakerLabels'

export type ReportBodyProps = {
  readonly paragraphs: readonly ScoredParagraph[]
  readonly speakers: SpeakerLabels | null
}
