import { ApiError } from '../ApiError.ts'
import type { Citation } from '../Citation.ts'
import { parseProtocol } from '../parseProtocol.ts'
import { citationWireSchema } from './citationWireSchema.ts'
import { validateReaderPath } from './validateReaderPath.ts'

export function validateCitation(input: unknown): Citation {
  const citation = parseProtocol(citationWireSchema, input)
  if (
    !citation.quote.trim() ||
    citation.citationId !==
      `${citation.documentId}:${citation.revisionId}:${citation.passageId}` ||
    citation.startChar !== 0 ||
    citation.endChar !== Array.from(citation.quote).length
  ) {
    throw new ApiError(
      'protocol',
      'The citation does not contain a complete, consistently identified passage.',
    )
  }
  validateReaderPath(citation)
  return citation
}
