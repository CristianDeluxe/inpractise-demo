import type { ReactNode } from 'react'
import type { CorrectedParagraph } from '../contracts/CorrectedParagraph'
import type { TranscriptParagraph } from '../contracts/TranscriptParagraph'
import type { DiffRow } from '../edits/DiffRow'

export type ParagraphTurnsProps = {
  readonly paragraph: TranscriptParagraph
  readonly corrected: CorrectedParagraph | undefined
  readonly note: string | null
  readonly active: boolean
  readonly onSeek: (seconds: number) => void
  /** The view's own text for one turn: raw words and edit segments of that turn. */
  readonly renderTurn: (turn: DiffRow) => ReactNode
}
