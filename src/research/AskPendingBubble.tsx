import type { AskPendingBubbleProps } from './AskPendingBubbleProps'
import { stageLabel } from './stageLabel'

/** The phase the server last reported, so waiting shows what is happening
 * rather than only that something is. */
export function AskPendingBubble({ stages }: AskPendingBubbleProps) {
  const current = stages.at(-1)
  return (
    <li className="flex justify-start">
      <div
        role="status"
        className="max-w-[85%] rounded-2xl rounded-bl-md bg-secondary px-4 py-3"
      >
        <span className="flex gap-1" aria-hidden="true">
          <span className="size-1.5 animate-pulse rounded-full bg-muted-foreground" />
          <span className="size-1.5 animate-pulse rounded-full bg-muted-foreground [animation-delay:150ms]" />
          <span className="size-1.5 animate-pulse rounded-full bg-muted-foreground [animation-delay:300ms]" />
        </span>
        <p className="mt-2 text-xs text-muted-foreground">
          {current === undefined ? 'Asking the corpus' : stageLabel(current)}
        </p>
      </div>
    </li>
  )
}
