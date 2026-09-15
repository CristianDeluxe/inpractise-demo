/**
 * Progress reported while an answer is produced. Every field is a count, a
 * phase name, or an identifier the endpoint had already decided this caller may
 * read. No stage carries claim text, a quotation, or a citation identifier:
 * those are published only by the terminal result, after the authorization
 * recheck.
 */
export type AskStage =
  | { phase: 'debited' }
  | {
      phase: 'retrieved'
      mode: 'hybrid' | 'lexical_only'
      candidateCount: number
      candidateAt10?: readonly string[]
    }
  | {
      phase: 'selected'
      selectedCount: number
      suppliedCount: number
      selectedTokens: number
      selectedIds?: readonly string[]
    }
  | { phase: 'generating'; suppliedCount: number }
  | { phase: 'verifying'; citationCount: number }
