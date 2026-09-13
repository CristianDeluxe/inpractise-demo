import type { Citation } from '../Citation.ts'
import { validateCitation } from './validateCitation.ts'

/** Validates citation fields within an item; the action parser must validate its additional fields. */
export function validateCitationFields(
  input: Record<string, unknown>,
): Citation {
  return validateCitation({
    citationId: input['citationId'],
    documentId: input['documentId'],
    revisionId: input['revisionId'],
    passageId: input['passageId'],
    quote: input['quote'],
    startChar: input['startChar'],
    endChar: input['endChar'],
    title: input['title'],
    company: input['company'],
    origin: input['origin'],
    kind: input['kind'],
    speaker: input['speaker'],
    speakerRole: input['speakerRole'],
    interviewDate: input['interviewDate'],
    publishedAt: input['publishedAt'],
    sourceUrl: input['sourceUrl'],
    readerPath: input['readerPath'],
  })
}
