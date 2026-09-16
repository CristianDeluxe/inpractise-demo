import type { CompareRequest } from '@/api/CompareRequest'

/** Builds the cross-reference request. Omits the company key when the scope
 *  is every company, the same convention Ask uses, so the server compares
 *  the topic across every company the caller may read. */
export function compareRequestFor(
  topic: string,
  company: string,
): CompareRequest {
  return { action: 'compare', topic, ...(company ? { company } : {}) }
}
