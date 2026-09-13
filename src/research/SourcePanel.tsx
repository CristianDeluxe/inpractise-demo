import { PassageLoader } from '@/reader/PassageLoader'
import * as Dialog from '@radix-ui/react-dialog'
import type { CitationCardProps } from './CitationCardProps'

export function SourcePanel({ citation }: CitationCardProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="text-primary underline">
        Inspect source
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-ink/65" />
        <Dialog.Content className="source-dialog">
          <Dialog.Title className="text-2xl">Source passage</Dialog.Title>
          <Dialog.Description className="mt-2 text-sm text-muted-foreground">
            This passage is reauthorized before it is displayed.
          </Dialog.Description>
          <PassageLoader
            documentId={citation.documentId}
            revisionId={citation.revisionId}
            passageId={citation.passageId}
          />
          <Dialog.Close className="quiet-action mt-6">
            Close source
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
