import type { AssembledParagraph } from './AssembledParagraph.ts'
import type { CorrectionResponse } from './CorrectionResponse.ts'
import { keepVerbatimEdits } from './keepVerbatimEdits.ts'
import { numberEdits } from './numberEdits.ts'
import type { PreparedParagraph } from './PreparedParagraph.ts'

/** A paragraph the model skipped keeps its post-memory text and memory edits only. */
export function assembleParagraph(
  prepared: PreparedParagraph,
  returned: CorrectionResponse['paragraphs'][number] | undefined,
): AssembledParagraph {
  if (returned === undefined)
    return {
      paragraph: {
        paragraphId: prepared.id,
        text: prepared.text,
        edits: numberEdits(prepared.id, prepared.memoryEdits),
      },
      dropped: 0,
    }
  const validated = keepVerbatimEdits(prepared, returned.edits)
  return {
    paragraph: {
      paragraphId: prepared.id,
      text: returned.text,
      edits: numberEdits(prepared.id, [
        ...prepared.memoryEdits,
        ...validated.edits,
      ]),
    },
    dropped: validated.dropped,
  }
}
