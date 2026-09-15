import { AskAnswerBubble } from './AskAnswerBubble'
import type { AskExchangeViewProps } from './AskExchangeViewProps'
import { AskNoticeBubble } from './AskNoticeBubble'
import { AskQuestionBubble } from './AskQuestionBubble'
import { AskResolvedQuestion } from './AskResolvedQuestion'

export function AskExchangeView({ exchange }: AskExchangeViewProps) {
  return (
    <>
      <AskQuestionBubble question={exchange.question} />
      {exchange.answer?.resolvedQuery === undefined ||
      exchange.answer.resolvedQuery === exchange.question ? null : (
        <AskResolvedQuestion query={exchange.answer.resolvedQuery} />
      )}
      {exchange.answer === undefined ? null : (
        <AskAnswerBubble answer={exchange.answer} />
      )}
      {exchange.failure === undefined ? null : (
        <AskNoticeBubble text={exchange.failure} />
      )}
    </>
  )
}
