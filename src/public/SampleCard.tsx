import * as Dialog from '@radix-ui/react-dialog'
import { useSampleDialog } from './hooks/useSampleDialog'
import type { SampleCardProps } from './SampleCardProps'
import { SampleDialog } from './SampleDialog'

export function SampleCard({ source }: SampleCardProps) {
  const { open, setOpen, openSource, restoreFocus } = useSampleDialog()
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <figure className="border-t border-border py-6">
        <blockquote className="source-text">
          “{source.passages[0].text}”
          <button
            type="button"
            onClick={openSource}
            aria-haspopup="dialog"
            aria-expanded={open}
            className="ml-2 inline-flex size-5 items-center justify-center rounded-full bg-primary align-middle text-[10px] font-bold text-primary-foreground transition-transform motion-safe:hover:scale-110"
            aria-label={`Open source ${source.documentId}`}
          >
            {source.documentId === 's1' ? '1' : '2'}
          </button>
        </blockquote>
        <figcaption className="mt-3 text-xs text-muted-foreground">
          {source.passages[0].speaker} · {source.passages[0].speakerRole}
          <br />
          Interview: {source.interviewDate} · Published: {source.publishedAt}
          <br />
          {source.disclosure}
        </figcaption>
        <button
          type="button"
          onClick={openSource}
          aria-haspopup="dialog"
          aria-expanded={open}
          className="hover-underline mt-4 text-xs font-semibold uppercase tracking-widest text-primary transition-colors hover:text-foreground"
        >
          Open source passage →
        </button>
      </figure>
      <SampleDialog source={source} restoreFocus={restoreFocus} />
    </Dialog.Root>
  )
}
