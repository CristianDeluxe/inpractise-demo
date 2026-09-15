import type { AskResolvedQuestionProps } from './AskResolvedQuestionProps'

export function AskResolvedQuestion({ query }: AskResolvedQuestionProps) {
  return (
    <li className="flex justify-end">
      <p className="max-w-[85%] text-right text-[11px] text-muted-foreground">
        Asked the corpus as: <span className="italic">{query}</span>
      </p>
    </li>
  )
}
