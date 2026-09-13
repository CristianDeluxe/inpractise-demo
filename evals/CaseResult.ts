import type { JudgeVerdict } from './JudgeVerdict.ts'

/** One case's outcome. No question text, no passage text: the report is shared. */
export type CaseResult = {
  caseId: string
  persona: string
  expectedStatus: string
  actualStatus: string
  statusMatched: boolean
  goldRecallAt10: boolean
  goldInContext: boolean
  diagnosis: 'pass' | 'retrieval_miss' | 'selection_miss'
  citationsAllAuthorised: boolean
  forbiddenStringsLeaked: string[]
  candidateCount: number
  verdict: JudgeVerdict
}
