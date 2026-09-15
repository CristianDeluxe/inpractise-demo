import type { RetrievalSummary } from './RetrievalSummary.ts'
import type { SubQuestion } from './SubQuestion.ts'

/**
 * Progress reported while an investigation runs. `elapsedMs` is the time since
 * the investigation started at the moment the stage was emitted, so a reader
 * can see where the seconds went. Sub-question text is derived from the
 * caller's own question and the company slugs they may already list; no stage
 * carries claim text, a quotation, or a citation identifier the effective
 * principal may not read.
 */
export type InvestigateStage =
  | { phase: 'debited'; elapsedMs: number }
  | { phase: 'plan'; elapsedMs: number; subQuestions: readonly SubQuestion[] }
  | ({ phase: 'retrieve'; step: number; elapsedMs: number } & RetrievalSummary)
  | ({
      phase: 'refine'
      step: number
      elapsedMs: number
      question: string
    } & RetrievalSummary)
  | {
      phase: 'synthesise'
      elapsedMs: number
      suppliedCount: number
      subQuestionCount: number
    }
