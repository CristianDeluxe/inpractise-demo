import type { AskNoticeBubbleProps } from './AskNoticeBubbleProps'

export function AskNoticeBubble({ text }: AskNoticeBubbleProps) {
  return (
    <li className="flex justify-start">
      <p
        role="alert"
        className="max-w-[85%] rounded-2xl rounded-bl-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm leading-relaxed"
      >
        {text}
      </p>
    </li>
  )
}
