export type SelectionMissRecord = {
  caseId: string
  question: string
  persona: string
  company: string
  expectedStatus: string
  observedStatus: string
  goldIds: readonly string[]
  observedRanks: readonly number[]
  capDecision: string
  adrPath: string
}
