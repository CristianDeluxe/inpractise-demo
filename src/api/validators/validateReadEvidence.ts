import { ApiError } from '../ApiError.ts'
import type { ReadRequest } from '../ReadRequest.ts'
import type { ResponseEvidence } from '../ResponseEvidence.ts'

/**
 * Reject even well-formed evidence if it identifies a different requested passage
 * or revision. A reader must not silently substitute the current revision for the
 * historical evidence that a citation actually referenced.
 */
export function validateReadEvidence(
  request: ReadRequest,
  evidence: ResponseEvidence,
): void {
  const citation = evidence.citations[0]
  if (
    evidence.citations.length !== 1 ||
    !citation ||
    citation.documentId !== request.documentId ||
    citation.revisionId !== request.revisionId ||
    citation.passageId !== request.passageId
  ) {
    throw new ApiError(
      'protocol',
      'The reader response does not match the requested passage.',
    )
  }
}
