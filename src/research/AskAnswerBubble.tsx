import type { AskAnswerBubbleProps } from './AskAnswerBubbleProps'
import { AskCitationChips } from './AskCitationChips'
import { answerBubbleText } from './answerBubbleText'
import { answerStatusLabel } from './answerStatusLabel'

export function AskAnswerBubble({ answer }: AskAnswerBubbleProps) {
  return (
    <li className="flex justify-start">
      <div className="max-w-[85%]">
        <div className="rounded-2xl rounded-bl-md bg-secondary px-4 py-3 text-sm leading-relaxed">
          <p className="whitespace-pre-wrap">{answerBubbleText(answer)}</p>
          {answer.missingEvidence.length > 0 ? (
            <ul className="mt-3 list-disc pl-4 text-xs text-muted-foreground">
              {answer.missingEvidence.map((text) => (
                <li key={text}>{text}</li>
              ))}
            </ul>
          ) : null}
        </div>
        <p className="mt-1 text-[11px] text-muted-foreground">
          {answerStatusLabel(answer.status)} · {answer.candidateCount} passages
          retrieved
        </p>
        <AskCitationChips citations={answer.citations} />
      </div>
    </li>
  )
}
