import * as Dialog from '@radix-ui/react-dialog'
import { Link } from '@tanstack/react-router'
import { X } from 'lucide-react'
import { AskChat } from './AskChat'

export function AskBubblePanel() {
  return (
    <Dialog.Content className="fixed bottom-4 right-4 top-4 z-50 flex w-[calc(100vw-2rem)] max-w-[26rem] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl data-[state=closed]:duration-200 data-[state=open]:duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-bottom-4 data-[state=open]:slide-in-from-bottom-4">
      <div className="flex items-start justify-between gap-4 border-b border-border px-4 py-3">
        <div>
          <Dialog.Title className="font-sans text-base">Ask IP</Dialog.Title>
          <Dialog.Description className="mt-0.5 text-[11px] text-muted-foreground">
            The whole corpus you may read.{' '}
            <Link to="/app/ask" className="underline underline-offset-4">
              Open the full page
            </Link>{' '}
            to scope it or inspect the evidence.
          </Dialog.Description>
        </div>
        <Dialog.Close
          aria-label="Close Ask IP"
          className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
        >
          <X size={18} strokeWidth={1.5} aria-hidden="true" />
        </Dialog.Close>
      </div>
      <AskChat company="" />
    </Dialog.Content>
  )
}
