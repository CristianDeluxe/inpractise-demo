import { AskAnswerBubble } from './AskAnswerBubble'
import type { AskExchangeViewProps } from './AskExchangeViewProps'
import { AskNoticeBubble } from './AskNoticeBubble'
import { AskQuestionBubble } from './AskQuestionBubble'

export function AskExchangeView({ exchange }: AskExchangeViewProps) {
  return (
    <>
      <AskQuestionBubble question={exchange.question} />
      {exchange.answer === undefined ? null : (
        <AskAnswerBubble answer={exchange.answer} />
      )}
      {exchange.failure === undefined ? null : (
        <AskNoticeBubble text={exchange.failure} />
      )}
    </>
  )
}
