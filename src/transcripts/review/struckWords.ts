import type { CorrectionEdit } from '../contracts/CorrectionEdit'
import type { TranscriptParagraph } from '../contracts/TranscriptParagraph'
import { placeEdits } from '../edits/placeEdits'
import { wordsTouching } from '../edits/wordsTouching'
import type { DecisionMap } from './DecisionMap'
import { isNotRejected } from './isNotRejected'
import { paragraphRawText } from './paragraphRawText'

/** Raw words an edit still rewrites; rejected edits leave their words alone. */
export function struckWords(
  paragraph: TranscriptParagraph,
  edits: readonly CorrectionEdit[],
  decisions: DecisionMap,
): boolean[] {
  const keep = isNotRejected(decisions)
  const placements = placeEdits(paragraphRawText(paragraph), edits).filter(
    (placement) => keep(placement.edit),
  )
  return wordsTouching(
    paragraph.words.map((word) => word.text),
    placements,
  )
}
