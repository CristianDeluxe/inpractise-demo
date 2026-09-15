import { buildContext } from '../answer/buildContext.ts'
import type { CitationSource } from '../citations/CitationSource.ts'

/**
 * Both sides in one message under one numbering: interviews first, filings
 * continuing the count, so a label identifies a passage and its side at once.
 */
export function comparisonPrompt(
  topic: string,
  interviews: readonly CitationSource[],
  filings: readonly CitationSource[],
): string {
  return (
    `Topic: ${topic}\n\nINTERVIEWS:\n${buildContext(interviews)}\n\n` +
    `FILINGS:\n${buildContext(filings, interviews.length)}\n\n` +
    'Reply with JSON only: {"interviews":{"status":"answered|partial|not_found",' +
    '"claims":[{"text":"...","quote":"...","sources":[1]}],"missingEvidence":["..."]},' +
    '"filings":{"status":"answered|partial|not_found","claims":[{"text":"...","quote":"...","sources":[2]}],"missingEvidence":["..."]},' +
    '"relations":[{"interviewClaim":1,"filingClaim":1,"relation":"agrees|contradicts|extends"}]}'
  )
}
