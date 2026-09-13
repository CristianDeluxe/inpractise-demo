import { z } from 'zod'
import { ApiError } from '../ApiError.ts'
import type { Citation } from '../Citation.ts'
import { parseProtocol } from '../parseProtocol.ts'
import { validateReaderPath } from './validateReaderPath.ts'

export function validateCitation(input: unknown): Citation {
  const citation = parseProtocol(
    z.strictObject({
      citationId: z.string().min(1),
      documentId: z.string().min(1),
      revisionId: z.string().min(1),
      passageId: z.string().min(1),
      quote: z.string().min(1),
      startChar: z.number().int().nonnegative(),
      endChar: z.number().int().nonnegative(),
      title: z.string(),
      company: z.string(),
      origin: z.enum(['synthetic', 'public']),
      speaker: z.string().nullable(),
      speakerRole: z.string().nullable(),
      interviewDate: z.string().nullable(),
      publishedAt: z.string().min(1),
      sourceUrl: z.string().nullable(),
      readerPath: z.string(),
    }),
    input,
  )
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
