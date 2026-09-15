import type { SelectionMissRecord } from './SelectionMissRecord'

/**
 * A labeled case from the frozen gold set, not a live classification. Only a
 * case with a known gold passage can be called a selection miss: an ordinary
 * dropped candidate is not evidence that it held the answer.
 */
export const recordedSelectionMiss: SelectionMissRecord = {
  caseId: 'F03',
  question: "How is Costco's fiscal year structured?",
  persona: 'basic',
  company: 'costco',
  expectedStatus: 'answered',
  observedStatus: 'not_found',
  goldIds: ['cost-2024:business-0002', 'cost-2025:business-0002'],
  observedRanks: [5, 6],
  capDecision:
    'The first four candidates exhausted the two-per-document cap across the two Costco documents, so the gold passages at ranks 5 and 6 never entered the context budget.',
  adrPath: 'docs/adr/0005-retain-f03-selection-miss.md',
}
