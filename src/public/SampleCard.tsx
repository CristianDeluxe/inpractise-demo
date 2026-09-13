import * as Dialog from '@radix-ui/react-dialog'
import type { SampleCardProps } from './SampleCardProps'
import { SamplePassages } from './SamplePassages'

export function SampleCard({ source }: SampleCardProps) {
  return (
    <Dialog.Root>
      <figure className="border-t border-border py-6">
        <blockquote className="source-text">
          “{source.passages[0].text}”
        </blockquote>
        <figcaption className="mt-3 text-xs text-muted-foreground">
          {source.passages[0].speaker} · {source.passages[0].speakerRole}
          <br />
          Interview: {source.interviewDate} · Published: {source.publishedAt}
          <br />
          {source.disclosure}
        </figcaption>
        <Dialog.Trigger className="mt-4 text-xs font-semibold uppercase tracking-widest text-primary">
          Open source passage →
        </Dialog.Trigger>
      </figure>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-ink/65" />
        <Dialog.Content className="source-dialog">
          <Dialog.Title className="pr-8 font-serif text-2xl">
            {source.title}
          </Dialog.Title>
          <Dialog.Description className="mt-3 text-sm">
            Curated example — not a live answer. {source.disclosure}.
          </Dialog.Description>
          <SamplePassages source={source} />
          <Dialog.Close className="quiet-action mt-6">
            Close source
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
