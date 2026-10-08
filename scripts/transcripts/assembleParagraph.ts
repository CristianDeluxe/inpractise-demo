import type { AssembledParagraph } from './AssembledParagraph.ts'
import type { CorrectionResponse } from './CorrectionResponse.ts'
import { countUnreported } from './countUnreported.ts'
import { keepVerbatimEdits } from './keepVerbatimEdits.ts'
import { locateModelEdits } from './locateModelEdits.ts'
import { numberEdits } from './numberEdits.ts'
import { placeDrafts } from './placeDrafts.ts'
import type { PreparedParagraph } from './PreparedParagraph.ts'

/**
 * The paragraph text is rebuilt from the raw text and the edits that survive
 * validation; the model's own text only helps place them. A change the model
 * made without reporting it never reaches the reviewer unannounced. A
 * paragraph the model skipped keeps its memory edits only.
 */
export function assembleParagraph(
  prepared: PreparedParagraph,
  returned: CorrectionResponse['paragraphs'][number] | undefined,
): AssembledParagraph {
  const validated = returned
    ? keepVerbatimEdits(prepared, returned.edits)
    : { edits: [], dropped: 0 }
  const located = locateModelEdits(
    prepared.raw,
    validated.edits,
    returned?.text ?? '',
  )
  const drafts = [...prepared.memoryEdits, ...located]
  const { edits, text } = placeDrafts(prepared.raw, drafts)
  return {
    paragraph: {
      paragraphId: prepared.id,
      text,
      edits: numberEdits(prepared.id, edits),
    },
    dropped: validated.dropped + drafts.length - edits.length,
    unreported: returned ? countUnreported(text, returned.text) : 0,
  }
}
