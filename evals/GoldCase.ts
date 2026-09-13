/** One evaluation case: a question, the evidence that answers it, and the
 *  status the system is expected to return. */
export type GoldCase = {
  caseId: string
  persona: string
  question: string
  company: string
  expectedStatus: 'answered' | 'partial' | 'conflict' | 'not_found'
  goldIds: string[]
  mustNotContain: string[]
}
