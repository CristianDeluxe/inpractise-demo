/**
 * Progress reported while an answer is produced. Every field is a count, a
 * phase name, or an identifier the endpoint had already decided this caller may
 * read. No stage carries claim text, a quotation, or a citation identifier:
 * those are published only by the terminal result, after the authorization
 * recheck. `elapsedMs` is server time spent on that phase alone, so a reader
 * sees where the wait went rather than only that a wait happened.
 */
export type AskStage =
  | { phase: 'debited'; elapsedMs?: number }
  | {
      phase: 'retrieved'
      mode: 'hybrid' | 'lexical_only'
      candidateCount: number
      candidateAt10?: readonly string[]
      elapsedMs?: number
    }
  | {
      phase: 'selected'
      selectedCount: number
      suppliedCount: number
      selectedTokens: number
      selectedIds?: readonly string[]
      elapsedMs?: number
    }
  | { phase: 'generating'; suppliedCount: number; elapsedMs?: number }
  | { phase: 'verifying'; citationCount: number; elapsedMs?: number }
