/**
 * Progress reported while a cross-reference is produced. As with an answer,
 * every field is a count, a mode or a phase name: no stage carries claim text,
 * a quotation or a citation identifier before the authorization recheck.
 */
export type CompareStage =
  | { phase: 'debited' }
  | {
      phase: 'retrieved'
      mode: 'hybrid' | 'lexical_only'
      interviewCandidates: number
      filingCandidates: number
    }
  | {
      phase: 'selected'
      interviewCount: number
      filingCount: number
      selectedTokens: number
    }
  | { phase: 'generating'; suppliedCount: number }
  | { phase: 'verifying'; citationCount: number }
