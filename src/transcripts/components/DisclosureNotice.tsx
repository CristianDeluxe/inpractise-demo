import { Info } from 'lucide-react'
import type { DisclosureNoticeProps } from './DisclosureNoticeProps'

/** The source note: one muted line, so it is always there without taking space. */
export function DisclosureNotice({ text }: DisclosureNoticeProps) {
  return (
    <p
      role="note"
      className="mt-3 flex items-start gap-1.5 text-xs leading-snug text-muted-foreground print:text-black"
    >
      <Info aria-hidden="true" className="mt-px size-3.5 shrink-0" />
      <span>{text}</span>
    </p>
  )
}
