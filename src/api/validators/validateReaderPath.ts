import { ApiError } from '../ApiError.ts'
import type { Citation } from '../Citation.ts'

export function validateReaderPath(citation: Citation): void {
  const segments = [
    citation.documentId,
    citation.revisionId,
    citation.passageId,
  ]
  if (segments.some((segment) => segment === '.' || segment === '..')) {
    throw new ApiError(
      'protocol',
      'The citation contains a path traversal identifier.',
    )
  }
  let expected: string
  try {
    expected = `/read/${segments.map((segment) => encodeURIComponent(segment)).join('/')}`
  } catch {
    throw new ApiError(
      'protocol',
      'The citation contains an invalid identifier.',
    )
  }
  if (citation.readerPath !== expected)
    throw new ApiError(
      'protocol',
      'The citation reader path does not match its immutable identity.',
    )
}
