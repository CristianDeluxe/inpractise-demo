import { answerStatusLabel } from './answerStatusLabel'
import type { SubQuestionBreakdownProps } from './SubQuestionBreakdownProps'

/**
 * One row per planned sub-question, in plan order, so a reader sees which
 * parts of the question the corpus could establish before reading the
 * synthesised claims below.
 */
export function SubQuestionBreakdown({
  subQuestions,
}: SubQuestionBreakdownProps) {
  if (!subQuestions.length) return null
  return (
    <ol aria-label="Sub-questions" className="my-6 space-y-3">
      {subQuestions.map((part) => (
        <li
          key={part.index}
          className="border border-border bg-card p-3 text-sm"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p>{part.question}</p>
            <span className="shrink-0 text-xs text-muted-foreground">
              {answerStatusLabel(part.status)}
            </span>
          </div>
          {part.originalQuestion ? (
            <p className="mt-1 text-xs text-muted-foreground">
              Reformulated from: {part.originalQuestion}
            </p>
          ) : null}
          <p className="mt-1 text-xs text-muted-foreground">
            {part.mode === 'hybrid' ? 'Hybrid' : 'Lexical only'} ·{' '}
            {part.candidateCount} candidates · {part.selectedCount} selected ·{' '}
            {part.citationIds.length} cited
          </p>
        </li>
      ))}
    </ol>
  )
}
