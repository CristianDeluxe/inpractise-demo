import { DialogDismiss } from '@/components/DialogDismiss'
import * as Dialog from '@radix-ui/react-dialog'
import type { SampleDialogProps } from './SampleDialogProps'
import { SamplePassages } from './SamplePassages'

export function SampleDialog({ source, restoreFocus }: SampleDialogProps) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-40 bg-ink/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <Dialog.Content
        onCloseAutoFocus={restoreFocus}
        className="source-dialog max-w-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
      >
        <DialogDismiss />
        <Dialog.Title className="pr-8 font-serif text-2xl">
          {source.title}
        </Dialog.Title>
        <Dialog.Description className="mt-3 text-sm">
          Curated example — not a live answer. {source.disclosure}.
        </Dialog.Description>
        <SamplePassages source={source} />
        <Dialog.Close className="quiet-action mt-6">Close source</Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
