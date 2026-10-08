import type { ScoredParagraph } from '../reliability/ScoredParagraph'

export type ReportBodyProps = {
  readonly paragraphs: readonly ScoredParagraph[]
}
