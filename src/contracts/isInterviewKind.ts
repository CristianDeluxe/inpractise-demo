import type { DocumentSummary } from './DocumentSummary'

/**
 * The one place that decides which library kinds are interviews. A new
 * interview kind is added here and every interview list follows.
 */
export function isInterviewKind(kind: DocumentSummary['kind']): boolean {
  return kind === 'synthetic_interview' || kind === 'public_interview'
}
