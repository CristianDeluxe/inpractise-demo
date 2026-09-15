import * as Dialog from '@radix-ui/react-dialog'
import { Link } from '@tanstack/react-router'
import { AskSession } from './AskSession'

export function AskBubblePanel() {
  return (
    <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[44rem] flex-col border-l border-border bg-background shadow-lg data-[state=closed]:duration-200 data-[state=open]:duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right">
      <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-4">
        <div>
          <Dialog.Title className="font-sans text-lg">Ask IP</Dialog.Title>
          <Dialog.Description className="mt-1 text-xs text-muted-foreground">
            Every question stands on its own and searches the whole corpus you
            are authorized to read.{' '}
            <Link to="/app/ask" className="underline underline-offset-4">
              Open the Ask page
            </Link>{' '}
            to scope it to one company.
          </Dialog.Description>
        </div>
        <Dialog.Close className="quiet-action shrink-0">Close</Dialog.Close>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
        <AskSession company="" />
      </div>
    </Dialog.Content>
  )
}
