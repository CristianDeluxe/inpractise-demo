import { Info } from 'lucide-react'
import type { DisclosureNoticeProps } from './DisclosureNoticeProps'

export function DisclosureNotice({ text }: DisclosureNoticeProps) {
  return (
    <p
      role="note"
      className="mt-5 flex max-w-3xl items-start gap-2 rounded-xl bg-accent/60 px-4 py-3 text-sm leading-relaxed text-accent-foreground"
    >
      <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
      <span>{text}</span>
    </p>
  )
}
