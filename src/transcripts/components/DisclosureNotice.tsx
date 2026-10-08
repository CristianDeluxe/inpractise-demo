import type { DisclosureNoticeProps } from './DisclosureNoticeProps'

export function DisclosureNotice({ text }: DisclosureNoticeProps) {
  return (
    <p
      role="note"
      className="prose-measure mt-6 border-l-4 border-primary bg-accent/50 px-4 py-3 text-sm text-accent-foreground"
    >
      {text}
    </p>
  )
}
