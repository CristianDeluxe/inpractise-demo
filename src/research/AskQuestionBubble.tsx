import type { AskQuestionBubbleProps } from './AskQuestionBubbleProps'

export function AskQuestionBubble({ question }: AskQuestionBubbleProps) {
  return (
    <li className="flex justify-end">
      <p className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-md bg-primary px-4 py-3 text-sm leading-relaxed text-primary-foreground">
        {question}
      </p>
    </li>
  )
}
