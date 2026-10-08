import type { DocumentSummary } from './DocumentSummary'

/**
 * The one place that decides which library kinds are interviews. Only the
 * public podcast interviews are shown to visitors: the older synthetic
 * interviews and filings stay hidden even if a list response carries them.
 */
export function isInterviewKind(kind: DocumentSummary['kind']): boolean {
  return kind === 'public_interview'
}
