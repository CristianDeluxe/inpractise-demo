import { AskExchangeView } from './AskExchangeView'
import { AskPendingBubble } from './AskPendingBubble'
import type { AskTranscriptProps } from './AskTranscriptProps'

export function AskTranscript({
  exchanges,
  pending,
  stages,
}: AskTranscriptProps) {
  return (
    <ul aria-label="Questions and answers" className="space-y-4">
      {exchanges.map((exchange) => (
        <AskExchangeView key={exchange.id} exchange={exchange} />
      ))}
      {pending ? <AskPendingBubble stages={stages} /> : null}
    </ul>
  )
}
