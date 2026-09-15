import type { CompareRequest } from '@/api/CompareRequest'

/** Builds the cross-reference request. Unlike Ask, a company scope is
 *  required: comparing "everything" against "everything" is not a request
 *  the retrieval side of this action can answer. */
export function compareRequestFor(
  topic: string,
  company: string,
): CompareRequest {
  return { action: 'compare', company, topic }
}
